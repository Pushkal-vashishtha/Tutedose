const mongoose = require('mongoose');

const IntervalSchema = new mongoose.Schema({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
});

const VideoProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  watchedIntervals: [IntervalSchema],
  lastPosition: {
    type: Number,
    default: 0,
  },
  videoDuration: {
    type: Number,
    required: true,
  },
});

// Add compound index to ensure one progress document per user per video
VideoProgressSchema.index({ userId: 1, videoId: 1 }, { unique: true });

module.exports = mongoose.model('VideoProgress', VideoProgressSchema);