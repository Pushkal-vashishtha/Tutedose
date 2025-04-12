import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProgress } from '../../services/api';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import ProgressDisplay from '../../components/ProgressDisplay/ProgressDisplay';
import './LecturePage.css';

const LecturePage = () => {
  const { videoId } = useParams();
  const userId = 'user123'; // In a real app, this would come from auth
  const [progress, setProgress] = useState(0);
  const [initialPosition, setInitialPosition] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  
  // Mock video data - in a real app this would come from an API
  const videoData = {
    'lecture1': {
      title: 'Introduction to Algorithms',
      url: 'https://www.youtube.com/watch?v=k455rmA-xF4',
    },
    'lecture2': {
      title: 'Data Structures Fundamentals',
      url: 'https://www.youtube.com/watch?v=RRBF2YWXFtY',
    },
  };
  
  const currentVideo = videoData[videoId] || videoData.lecture1;
  
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await getProgress(userId, videoId);
        setProgress(response.data.progress);
        setInitialPosition(response.data.lastPosition);
        setVideoDuration(response.data.videoDuration);
      } catch (err) {
        console.error('Error fetching progress:', err);
      }
    };
    
    fetchProgress();
  }, [videoId, userId]);
  
  return (
    <div className="lecture-page">
      <h1>{currentVideo.title}</h1>
      <div className="lecture-content">
        <div className="video-section">
          <VideoPlayer
            userId={userId}
            videoId={videoId}
            videoUrl={currentVideo.url}
            initialPosition={initialPosition}
            onProgressUpdate={setProgress}
          />
        </div>
        <div className="progress-section">
          <ProgressDisplay progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default LecturePage;