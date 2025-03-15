import React from 'react';

function FeedbackPopup({ isCorrect, onClose }) {
  return (
    <div className="feedback-overlay" onClick={onClose}>
      <div className={`feedback-popup ${isCorrect ? 'correct' : 'incorrect'}`}>
        {isCorrect ? (
          <>
            <span className="feedback-icon">✓</span>
            <span className="feedback-text">Correct!</span>
          </>
        ) : (
          <>
            <span className="feedback-icon">✗</span>
            <span className="feedback-text">Try again</span>
          </>
        )}
      </div>
    </div>
  );
}

export default FeedbackPopup; 