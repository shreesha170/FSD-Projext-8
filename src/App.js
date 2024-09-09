import React, { useState, useEffect } from 'react';
import UploadNovelForm from './NovelForm';
import './App.css';

const App = () => {
  const [novels, setNovels] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedNovel, setSelectedNovel] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const storedNovels = JSON.parse(localStorage.getItem('novels'));
    if (storedNovels) {
      setNovels(storedNovels);
    }
  }, []);

  const addNovel = (novel) => {
    const updatedNovels = [...novels, novel];
    setNovels(updatedNovels);
    localStorage.setItem('novels', JSON.stringify(updatedNovels));
    setCurrentView('home');
  };

  const viewNovelDetails = (novel) => {
    setSelectedNovel(novel);
    setCurrentView('details');
  };

  const toggleMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const renderView = () => {
    if (currentView === 'home') {
      return (
        <div className="novel-list">
          <h1>Novel List</h1>
          <button onClick={() => setCurrentView('upload')} className="nav-button">Upload New Novel</button>
          <div className="novel-list-grid">
            {novels.map((novel, index) => (
              <div
                key={index}
                className="novel-card"
                onClick={() => viewNovelDetails(novel)}
              >
                <img src={novel.imageUrl} alt={novel.title} />
                <div className="novel-card-content">
                  <p className="novel-card-title">{novel.title}</p>
                  <p className="novel-card-details">{novel.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (currentView === 'upload') {
      return <UploadNovelForm addNovel={addNovel} onBackToHome={() => setCurrentView('home')} />;
    } else if (currentView === 'details' && selectedNovel) {
      return (
        <div className="novel-detail">
          <h2>{selectedNovel.title}</h2>
          <img
            src={selectedNovel.imageUrl}
            alt={selectedNovel.title}
            className="novel-detail-image"
          />
          <p>Author: {selectedNovel.author}</p>
          <p>Genre: {selectedNovel.genre}</p>
          <p>Summary: {selectedNovel.summary}</p>
          <button onClick={() => setCurrentView('home')} className="nav-button">Back to Home</button>
        </div>
      );
    }
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <header>
        <h1>Novel Blog</h1>
        <button onClick={toggleMode} className="mode-toggle-btn">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <div className="content">
        {renderView()}
      </div>
      <footer>
        <p>&copy; 2024 Novel Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
