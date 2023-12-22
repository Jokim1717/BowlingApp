import "./ScoreCard.css";
import React, { useState } from "react";

const ScoreCard = () => {
  const frames = Array.from({ length: 9 }, (_, index) => index + 1);

  return (
    // <div>
    //   <h2>Bowling Scoring Calculator</h2>
    //   <div className="frame-container">
    //     {frames.map((frameNumber) => (
    //       <div key={frameNumber} className="frame-pair">
    //         <p className="frame-number">Frame {frameNumber}</p>
    //         <div className="frame-box">
    //           <div className="score-box">
    //             </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div>
      <h2>Bowling Score Calculator</h2>
      <div className="frameParent">
        {frames.map((frameNumber) => (
          <div key={frameNumber} className="frame">
              <div className="throw1"></div>
              <div className="throw2"></div>
            <div className="throwResult"></div>
          </div>
        ))}
        <div className="frame10">
          <div className="frame10throw1"></div>
          <div className="frame10throw2"></div>
          <div className="frame10throw3"></div>
          <div className="throwResult"></div>
        </div>
        <div className="totalScore"></div>
      </div>
    </div>
  );
};

export default ScoreCard;
