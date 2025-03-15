import React from 'react';

function FlashcardControls({ onPrev, onNext }) {
  return (
    <div className="controls">
      <button className="control-btn prev-btn" onClick={onPrev}>
        &#8592; Prev
      </button>
      <button className="control-btn next-btn" onClick={onNext}>
        Next &#8594;
      </button>
    </div>
  );
}

export default FlashcardControls;