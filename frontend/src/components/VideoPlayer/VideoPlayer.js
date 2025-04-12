import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { saveProgress } from '../../services/api';
import './VideoPlayer.css';

const VideoPlayer = ({ userId, videoId, videoUrl, initialPosition, onProgressUpdate }) => {
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(initialPosition || 0);
  const [playing, setPlaying] = useState(false);
  const [lastSavedInterval, setLastSavedInterval] = useState(null);
  const playerRef = useRef(null);
  
  // Track watched intervals
  const [watchedIntervals, setWatchedIntervals] = useState([]);
  
  // Save progress every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (playing && duration > 0) {
        saveCurrentProgress();
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [playing, position, duration]);
  
  const saveCurrentProgress = async () => {
    if (!playing || !lastSavedInterval) return;
    
    const currentTime = playerRef.current.getCurrentTime();
    const newInterval = {
      start: lastSavedInterval.start,
      end: currentTime,
    };
    
    try {
      const response = await saveProgress(
        userId,
        videoId,
        newInterval,
        currentTime,
        duration
      );
      
      if (response.data.success) {
        setLastSavedInterval(null);
        onProgressUpdate(response.data.progress);
      }
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };
  
  const handlePlay = () => {
    setPlaying(true);
    // Start a new interval when play begins
    const currentTime = playerRef.current.getCurrentTime();
    setLastSavedInterval({ start: currentTime, end: currentTime });
  };
  
  const handlePause = () => {
    setPlaying(false);
    saveCurrentProgress();
  };
  
  const handleProgress = (state) => {
    setPosition(state.playedSeconds);
  };
  
  const handleDuration = (duration) => {
    setDuration(duration);
  };
  
  const handleSeek = (seconds) => {
    // When user seeks, we should end the current interval if it exists
    if (lastSavedInterval) {
      saveCurrentProgress();
    }
  };
  
  return (
    <div className="video-player-container">
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        controls
        width="100%"
        height="100%"
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onSeek={handleSeek}
        progressInterval={1000}
        played={position / duration}
      />
    </div>
  );
};

export default VideoPlayer;