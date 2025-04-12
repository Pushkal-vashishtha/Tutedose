import React from 'react';
import './ProgressDisplay.css';

const ProgressDisplay = ({ progress }) => {
  return (
    <div className="progress-container">
      <h3>Your Progress</h3>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="progress-text">{progress.toFixed(1)}% watched</div>
      <p className="progress-note">
        Note: Only unique watch time is counted. Rewatching sections won't increase progress.
      </p>
    </div>
  );
};

export default ProgressDisplay;