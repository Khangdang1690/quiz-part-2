import React, { useState } from 'react';
import FeedbackPopup from './FeedbackPopup';

function AnswerInput({ answer, onSubmit }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple fuzzy matching: trim whitespace, convert to lowercase, and check if answer contains user input
    const isCorrect = answer.toLowerCase().trim().includes(userAnswer.toLowerCase().trim());
    setFeedback(isCorrect);
    onSubmit?.(isCorrect);
    
    // Automatically hide feedback after 1.5 seconds
    setTimeout(() => {
      setFeedback(null);
    }, 1500);
  };

  const handleInputChange = (e) => {
    setFeedback(null);
    setUserAnswer(e.target.value);
  };

  return (
    <div className="answer-section">
      <form onSubmit={handleSubmit} className="answer-form">
        <input
          type="text"
          value={userAnswer}
          onChange={handleInputChange}
          placeholder="Type your answer..."
          className="answer-input"
        />
        <button type="submit" className="submit-answer-btn">Submit</button>
      </form>
      {feedback !== null && (
        <FeedbackPopup 
          isCorrect={feedback} 
          onClose={() => setFeedback(null)} 
        />
      )}
    </div>
  );
}

export default AnswerInput; 