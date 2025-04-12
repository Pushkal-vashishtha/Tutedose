import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const lectures = [
    { id: 'lecture1', title: 'Introduction to Algorithms' },
    { id: 'lecture2', title: 'Data Structures Fundamentals' },
  ];
  
  return (
    <div className="home-page">
      <h1>Available Lectures</h1>
      <div className="lecture-list">
        {lectures.map(lecture => (
          <div key={lecture.id} className="lecture-card">
            <h3>{lecture.title}</h3>
            <Link to={`/lecture/${lecture.id}`} className="watch-button">
              Watch Lecture
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;