import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const lectures = [
    { id: 'lecture1', title: 'Introduction to Algorithms' },
    { id: 'lecture2', title: 'Data Structures Fundamentals' },
    { id: 'lecture3', title: 'Sorting Algorithms Explained' },
    { id: 'lecture4', title: 'Recursion and Backtracking' },
    { id: 'lecture5', title: 'Dynamic Programming Basics' },
    { id: 'lecture6', title: 'Graph Algorithms - BFS & DFS' },
    { id: 'lecture7', title: 'Greedy Algorithms Overview' },
    { id: 'lecture8', title: 'Understanding Hash Tables' },
    { id: 'lecture9', title: 'Binary Trees and Traversals' },
    { id: 'lecture10', title: 'Heap and Priority Queues' },
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