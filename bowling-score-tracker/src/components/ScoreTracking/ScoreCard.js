import "./ScoreCard.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const ScoreCard = () => {
  const frames = Array.from({ length: 9 }, (_, index) => index + 1);

  const [scores, setScores] = useState(Array(10).fill(null));
  const [currentFrame, setCurrentFrame] = useState(1);
  const [currentThrow, setCurrentThrow] = useState(1);

  const handleThrow10 = (pins) => {

  };

  const handleThrow = (pins) => {
    if (currentFrame === 10) {
      handleThrow10(pins);

    } else {
      //if its the first throw
      if (currentThrow === 1) {
        if (pins === 10) {
          //handle strike
          setCurrentFrame(currentFrame + 1)
          setCurrentThrow(1)
          setScores
        } else if (pins == 11) {
          //handle spare
          setCurrentFrame(currentFrame + 1)
          setCurrentThrow(1)
        } else {
          //normal shot
        }
      }
    }
  };


  return (
    <div>
      <h2>Bowling Score Calculator</h2>
      <div className="frameParent">
        {frames.map((frameNumber) => (
          <div key={frameNumber} className="frame">
            <div className="throw1"></div>
            <div className="throw2"></div>
            <div className="throwResult">{scores[frameNumber]}</div>
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
      <div className="scoreParent">
        <Button
          className="scoreButton"
          variant="secondary"
          onClick={handleThrow(0)}
        >
          0
        </Button>
        {frames.map((frameNumber) => (
          <Button
            className="scoreButton"
            variant="secondary"
            key={frameNumber}
            onClick={handleThrow(frameNumber)}
          >
            {frameNumber}
          </Button>
        ))}
        <Button
          className="scoreButton"
          variant="secondary"
          onClick={handleThrow(10)}
        >
          X
        </Button>
        <Button
          className="scoreButton"
          variant="secondary"
          onClick={handleThrow(11)}
        >
          /
        </Button>
      </div>
    </div>
  );
};

export default ScoreCard;
