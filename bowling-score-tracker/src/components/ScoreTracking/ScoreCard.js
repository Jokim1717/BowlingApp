import "./ScoreCard.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const ScoreCard = () => {
  const frames = Array.from({ length: 9 }, (_, index) => index + 1);

  const [scores, setScores] = useState(Array(10).fill(0));
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentThrow, setCurrentThrow] = useState(1);
  const [lastShotType, setLastShotType] = useState(0);
  const [secondLastShotType, setSecondLastShotType] = useState(0);

  const handleThrow10 = (pins) => {};

  const handleThrow = (pins) => {
    console.log("handlethrow clicked with" + pins);
    if (currentFrame === 10) {
      handleThrow10(pins);
    } else {
      //FIRST THROW
      if (currentThrow === 1) {
        //STRIKE
        if (pins === 10) {
          //if last two shots were a strike
          if (secondLastShotType === 10) {
            if (currentFrame === 2) {
              setScoreAtIndex(currentFrame - 2, 30);
              swapLastAndSecondLast();
              setLastShotType(10);
              updateScoreAtIndex(currentFrame, 10);
              setCurrentFrame(currentFrame + 1);
            } else {
              console.log("erroring");
              setScoreAtIndex(currentFrame - 2, 30);
              addPrevFrame(currentFrame - 2);
              swapLastAndSecondLast();
              setLastShotType(10);
              updateScoreAtIndex(currentFrame, 10);
              setCurrentFrame(currentFrame + 1);
            }
          } else {
            //if current shot is a strike and last shot was a spare
            if (lastShotType === 11) {
              if (currentFrame === 1) {
                swapLastAndSecondLast()
                setScoreAtIndex(0, 20)
                setLastShotType(11);
                setCurrentFrame(currentFrame + 1);
              } else {
              swapLastAndSecondLast();
              setScoreAtIndex(currentFrame - 1, 20);
              addPrevFrame(currentFrame - 1);
              setLastShotType(10);
              setCurrentFrame(currentFrame + 1);
              }
            } else if (lastShotType === 10) {
              //if current shot is a strike and the last shot was a strike
              swapLastAndSecondLast();
              updateScoreAtIndex(currentFrame - 1, 10);
              updateScoreAtIndex(currentFrame, 10);
              setLastShotType(10);
              setCurrentFrame(currentFrame + 1);
            } else {
              //if current shot is strike on normal previous shots
              console.log("hihihi");
              swapLastAndSecondLast();
              updateScoreAtIndex(currentFrame, 10);
              setLastShotType(10);
              setCurrentFrame(currentFrame + 1);
            }
          }
        } else {
          //NORMAL SHOT
          console.log("normal shot clicked");
          //if current shot is normal and previous shot was spare

          if (lastShotType === 11) {
            setScoreAtIndex(currentFrame - 1, lastShotType - 1 + pins);
            addPrevFrame(currentFrame - 1);
            swapLastAndSecondLast();
            updateScoreAtIndex(currentFrame, pins);
            setLastShotType(pins);
            setCurrentThrow(2);
          }
          //if current shot is normal and previous shot was strike
          else if (lastShotType === 10) {
            swapLastAndSecondLast();
            updateScoreAtIndex(currentFrame, pins);
            setLastShotType(pins);
            setCurrentThrow(2);
          } else {
            //if current shot is normal and previous shot is normal
            swapLastAndSecondLast();
            updateScoreAtIndex(currentFrame, pins);
            setLastShotType(pins);
            // addPrevFrame(currentFrame);
            setCurrentThrow(2);
          }
        }
      } else {
        //SECOND THROW

        //spare
        if (pins === 11) {
          //if you spare on a strike
          if (secondLastShotType === 10) {
            updateScoreAtIndex(currentFrame - 1, secondLastShotType);
          }
          console.log("spare clicked");
          swapLastAndSecondLast();
          setCurrentFrame(currentFrame + 1);
          setCurrentThrow(1);
          setLastShotType(pins);
        } else {
          if (currentFrame === 0) {
            swapLastAndSecondLast();
            updateScoreAtIndex(currentFrame, pins);
            setLastShotType(pins);
            setCurrentFrame(currentFrame + 1);
            setCurrentThrow(1);
          } else {
            //normal shot
            console.log("error clicked");
            swapLastAndSecondLast();
            updateScoreAtIndex(currentFrame, pins);
            setLastShotType(pins);
            setCurrentThrow(1);
            setCurrentFrame(currentFrame + 1);
            addPrevFrame(currentFrame);
          }
        }
      }
    }
  };

  const addPrevFrame = (frameNumber) => {
    setScores((prevScores) => {
      if (currentFrame === 0) {
        const copyScores = [...prevScores];
        const currentFrameTotal = copyScores[frameNumber];
        copyScores[frameNumber] = currentFrameTotal;
        return copyScores;
      } else {
        const indexOfPrevFrame = frameNumber - 1;
        const copyScores = [...prevScores];
        const latestScore = copyScores[indexOfPrevFrame];
        console.log("latest score: " + latestScore);
        const currentFrameTotal = copyScores[frameNumber];
        console.log("current frame total: " + currentFrameTotal);
        const finalValue = latestScore + currentFrameTotal;
        copyScores[frameNumber] = finalValue;
        return copyScores;
      }
    });
  };

  const updateScoreAtIndex = (indexToUpdate, newValue) => {
    setScores((prevScores) => {
      // Create a copy of the previous scores array
      const updatedScores = [...prevScores];

      // Update the value at the specified index
      updatedScores[indexToUpdate] += newValue;
      console.log(updatedScores[indexToUpdate]);
      // Return the updated array
      return updatedScores;
    });
  };

  const setScoreAtIndex = (indexToUpdate, newValue) => {
    setScores((prevScores) => {
      // Create a copy of the previous scores array
      const updatedScores = [...prevScores];

      // Update the value at the specified index
      updatedScores[indexToUpdate] = newValue;
      console.log(updatedScores[indexToUpdate]);
      // Return the updated array
      return updatedScores;
    });
  };

  const swapLastAndSecondLast = () => {
    setSecondLastShotType(lastShotType);
    setLastShotType(null); // Reset lastShotType after swapping
  };

  return (
    <div>
      <h2>Bowling Score Calculator</h2>
      <div className="frameParent">
        {frames.map((frameNumber) => (
          <div key={frameNumber} className="frame">
            <div className="throw1"></div>
            <div className="throw2"></div>
            <div className="throwResult">{scores[frameNumber - 1]}</div>
          </div>
        ))}
        <div className="frame10">
          <div className="frame10throw1"></div>
          <div className="frame10throw2"></div>
          <div className="frame10throw3"></div>
          <div className="throwResult">{scores[9]}</div>
        </div>
        <div className="totalScore"></div>
      </div>
      <div className="scoreParent">
        <Button
          className="scoreButton"
          variant="secondary"
          onClick={() => handleThrow(0)}
        >
          0
        </Button>
        {frames.map((frameNumber) => (
          <Button
            className="scoreButton"
            variant="secondary"
            key={frameNumber}
            onClick={() => handleThrow(frameNumber)}
          >
            {frameNumber}
          </Button>
        ))}
        <Button
          className="scoreButton"
          variant="secondary"
          onClick={() => handleThrow(10)}
        >
          X
        </Button>
        <Button
          className="scoreButton"
          variant="secondary"
          onClick={() => handleThrow(11)}
        >
          /
        </Button>
      </div>
    </div>
  );
};

export default ScoreCard;
