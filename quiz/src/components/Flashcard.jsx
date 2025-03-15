import React from 'react';
import FlipHint from './FlipHint';

function Flashcard({ question, answer, showAnswer, onToggle }) {
  return (
    <div className={`flashcard ${showAnswer ? 'flipped' : ''}`} onClick={onToggle}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <p>{question}</p>
          <FlipHint />
        </div>
        <div className="flashcard-back">
          <p>{answer}</p>
          <FlipHint />
        </div>
      </div>
    </div>
  );
}

export default Flashcard;