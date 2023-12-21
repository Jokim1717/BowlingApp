import './ScoreCard.css'; 
import React, { useState } from 'react';

const ScoreCard = () => {
  const frames = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div>
      <h2>Bowling Scoring Calculator</h2>

      <div className="frame-container">
        {frames.map((frameNumber) => (
          <div key={frameNumber} className="frame-pair">
            <p className="frame-number">Frame {frameNumber}</p>
            <div className="frame-box">
              <div className="score-box">{/* Add score display here */}</div>
              {/* You can add more styling or content as needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreCard;
