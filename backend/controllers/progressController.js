const VideoProgress = require('../models/VideoProgress');

// Helper function to merge overlapping intervals
const mergeIntervals = (intervals) => {
  if (intervals.length === 0) return [];
  
  // Sort intervals by start time
  intervals.sort((a, b) => a.start - b.start);
  
  const merged = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];
    
    if (current.start <= last.end) {
      // Overlapping intervals, merge them
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }
  
  return merged;
};

// Calculate total watched duration from intervals
const calculateWatchedDuration = (intervals) => {
  return intervals.reduce((total, interval) => {
    return total + (interval.end - interval.start);
  }, 0);
};

// Save or update video progress
exports.saveProgress = async (req, res) => {
  try {
    const { userId, videoId, newInterval, lastPosition, videoDuration } = req.body;
    
    // Find existing progress or create new
    let progress = await VideoProgress.findOne({ userId, videoId });
    
    if (!progress) {
      progress = new VideoProgress({
        userId,
        videoId,
        watchedIntervals: [],
        lastPosition,
        videoDuration,
      });
    }
    
    // Update last position
    progress.lastPosition = lastPosition;
    
    // Update video duration if provided (in case it changes)
    if (videoDuration) {
      progress.videoDuration = videoDuration;
    }
    
    // Add new interval if provided
    if (newInterval) {
      progress.watchedIntervals.push(newInterval);
      
      // Merge overlapping intervals
      progress.watchedIntervals = mergeIntervals(progress.watchedIntervals);
    }
    
    await progress.save();
    
    // Calculate current progress percentage
    const watchedDuration = calculateWatchedDuration(progress.watchedIntervals);
    const progressPercent = (watchedDuration / progress.videoDuration) * 100;
    
    res.json({
      success: true,
      progress: progressPercent,
      lastPosition: progress.lastPosition,
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Get user's progress for a video
exports.getProgress = async (req, res) => {
  try {
    const { userId, videoId } = req.params;
    
    const progress = await VideoProgress.findOne({ userId, videoId });
    
    if (!progress) {
      return res.json({
        progress: 0,
        lastPosition: 0,
        videoDuration: 0,
      });
    }
    
    const watchedDuration = calculateWatchedDuration(progress.watchedIntervals);
    const progressPercent = (watchedDuration / progress.videoDuration) * 100;
    
    res.json({
      progress: progressPercent,
      lastPosition: progress.lastPosition,
      videoDuration: progress.videoDuration,
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};