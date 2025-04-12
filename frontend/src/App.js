import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LecturePage from './pages/LecturePage/LecturePage';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lecture/:videoId" element={<LecturePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;