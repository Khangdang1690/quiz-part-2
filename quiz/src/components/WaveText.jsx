import React from 'react';

function WaveText({ text }) {
  return (
    <div className="wave-container">
      <h2 className="wave-text">
        {text.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </h2>
    </div>
  );
}

export default WaveText;