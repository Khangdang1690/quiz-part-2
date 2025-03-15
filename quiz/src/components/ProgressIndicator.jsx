import React from 'react';

function ProgressIndicator({ currentIndex, totalCards }) {
  return (
    <div className="progress-indicator">
      <span>{currentIndex + 1}</span> / <span>{totalCards}</span>
    </div>
  );
}

export default ProgressIndicator;