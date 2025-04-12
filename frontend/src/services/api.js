import axios from 'axios';

const API = axios.create({
  baseURL: 'https://tutedose.onrender.com/api',
});

// Progress API
export const saveProgress = (userId, videoId, newInterval, lastPosition, videoDuration) => 
  API.post('/progress', { userId, videoId, newInterval, lastPosition, videoDuration });

export const getProgress = (userId, videoId) => 
  API.get(`/progress/${userId}/${videoId}`);