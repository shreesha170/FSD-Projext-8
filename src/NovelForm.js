import React, { useState } from 'react';
import './NovelForm.css';

const NovelForm = ({ addNovel, onBackToHome }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNovel({ title, author, genre, summary, imageUrl });
  };

  return (
    <div className="novel-form-container">
      <form className="novel-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className="input-field"
          />
        </label>
        <label>
          Author:
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
            className="input-field"
          />
        </label>
        <label>
          Genre:
          <input 
            type="text" 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)} 
            required 
            className="input-field"
          />
        </label>
        <label>
          Summary:
          <textarea 
            value={summary} 
            onChange={(e) => setSummary(e.target.value)} 
            required 
            className="textarea-field"
          />
        </label>
        <label>
          Image URL:
          <input 
            type="text" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            className="input-field"
          />
        </label>
        <button type="submit" className="submit-btn">Upload Novel</button>

        {/* Display the image if the imageUrl is not empty */}
        {imageUrl && (
          <div className="image-preview">
            <h3>Novel Cover:</h3>
            <img src={imageUrl} alt="Novel Cover" className="novel-image" />
          </div>
        )}
      </form>
      <button onClick={onBackToHome} className="back-home-btn">Back to Home</button>
    </div>
  );
};

export default NovelForm;
