import "./ScoreCard.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";

const ScoreCard = () => {
  const frames = Array.from({ length: 9 }, (_, index) => index + 1);

  const [scores, setScores] = useState(Array(10).fill(null));
  const [eachScore, setEachScore] = useState(Array(21).fill(null));
  const [currentShotNumber, setCurrentShotNumber] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentThrow, setCurrentThrow] = useState(1);
  const [lastShotType, setLastShotType] = useState(0);
  const [secondLastShotType, setSecondLastShotType] = useState(0);
  const [gameOverModal, setGameOverModal] = useState(false);

  const navigate = useNavigate();


  const addToHistory = () => {
    console.log('add to history')
  }

  const displayGameEnd = () => {
    console.log('hello')
    setGameOverModal(true);
  };

  const handleClose = () => setGameOverModal(false);

  // handles 10th frame logic
  const handleThrow10 = (pins) => {
    //First Throw
    if (currentThrow === 1) {
      setCurrentShotNumber(18);
      console.log("10th fame 1st shot");
      //STRIKE
      if (pins === 10) {
        addEachScore(currentShotNumber, pins);
        //if last two shots were a strike
        if (lastShotType === 10 && secondLastShotType === 10) {
          if (currentFrame === 2) {
            setScoreAtIndex(currentFrame - 2, 30);
            swapLastAndSecondLast();
            setLastShotType(10);
            updateScoreAtIndex(currentFrame, 10);
            setCurrentThrow(2);
            // setCurrentFrame(currentFrame + 1);
          } else {
            console.log("erroring");
            setScoreAtIndex(currentFrame - 2, 30);
            addPrevFrame(currentFrame - 2);
            swapLastAndSecondLast();
            setLastShotType(10);
            updateScoreAtIndex(currentFrame, 10);
            setCurrentThrow(2);
            // setCurrentFrame(currentFrame + 1);
          }
        } else {
          //if current shot is a strike and last shot was a spare
          if (lastShotType === 11) {
            if (currentFrame === 1) {
              swapLastAndSecondLast();
              setScoreAtIndex(0, 20);
              setLastShotType(11);
              setCurrentThrow(2);
              // setCurrentFrame(currentFrame + 1);
            } else {
              swapLastAndSecondLast();
              setScoreAtIndex(currentFrame - 1, 20);
              addPrevFrame(currentFrame - 1);
              setLastShotType(10);
              setCurrentThrow(2);
              // setCurrentFrame(currentFrame + 1);
            }
          } else if (lastShotType === 10) {
            //if current shot is a strike and the last shot was a strike
            swapLastAndSecondLast();
            updateScoreAtIndex(currentFrame - 1, 10);
            updateScoreAtIndex(currentFrame, 10);
            setLastShotType(10);
            setCurrentThrow(2);
            // setCurrentFrame(currentFrame + 1);
          } else {
            //if current shot is strike on normal previous shots
            console.log("normal strike on 10th first frame");
            swapLastAndSecondLast();
            updateScoreAtIndex(currentFrame, 10);
            setLastShotType(10);
            setCurrentThrow(2);
            // setCurrentFrame(currentFrame + 1);
          }
        }
      } else if (pins !== 11 || pins !== 10) {
        addEachScore(currentShotNumber, pins);
        //NORMAL SHOT
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
          console.log("normal shot clicked");
          //if current shot is normal and previous shot is normal
          swapLastAndSecondLast();
          updateScoreAtIndex(currentFrame, pins);
          setLastShotType(pins);
          // addPrevFrame(currentFrame);
          setCurrentThrow(2);
        }
      }
      //SECOND THROW
      setCurrentShotNumber(19);
    } else if (currentThrow === 2) {
      console.log("10th frame 2nd shot");
      if (pins === 10) {
        addEachScore(currentShotNumber, pins);
        //if last two shots were a strike
        if (lastShotType === 10 && secondLastShotType === 10) {
          console.log("hi");
          setScoreAtIndex(currentFrame - 1, 30);
          addPrevFrame(currentFrame - 1);
          swapLastAndSecondLast();
          setLastShotType(10);
          updateScoreAtIndex(currentFrame, 10);
          setCurrentThrow(3);
        } else if (lastShotType === 10) {
          //if current shot is a strike and the last shot was a strike
          console.log("here did this");
          swapLastAndSecondLast();
          // updateScoreAtIndex(currentFrame - 1, 10);
          updateScoreAtIndex(currentFrame, 10);
          setLastShotType(10);
          setCurrentThrow(3);
        }
      }
      //SPARE
      else if (pins === 11) {
        addEachScore(currentShotNumber, pins);
        //spare in 10th frame second shot with 9th frame strike
        if (secondLastShotType === 10) {
          swapLastAndSecondLast();
          updateScoreAtIndex(currentFrame - 1, secondLastShotType);
          setScoreAtIndex(currentFrame, 10);
          setLastShotType(pins);
          setCurrentThrow(3);
        } else {
          swapLastAndSecondLast();
          setScoreAtIndex(currentFrame, 10);
          setLastShotType(pins);
          setCurrentThrow(3);
        }
      }
      //normal shot on 2nd shot
      else if (pins !== 11 || pins !== 10) {
        addEachScore(currentShotNumber, pins);
        //9th frame strike, 10th frame first shot strike, 10th frame normal second shot
        if (lastShotType === 10 && secondLastShotType === 10) {
          setScoreAtIndex(currentFrame - 1, 20 + pins);
          addPrevFrame(currentFrame - 1);
          swapLastAndSecondLast();
          setLastShotType(pins);
          setCurrentThrow(3);
        }
        //9th frame strike, 10th frame first normal shot, second normal shot (game ends)
        else if (secondLastShotType === 10) {
          swapLastAndSecondLast();
          setScoreAtIndex(currentFrame - 2, 10 + lastShotType + pins);
          addPrevFrame(currentFrame - 2);
          updateScoreAtIndex(currentFrame, pins);
          addPrevFrame(currentFrame);
          setLastShotType(pins);
          setCurrentFrame(10);
          displayGameEnd();
        } else {
          //10th frame first normal, second normal
          swapLastAndSecondLast();
          updateScoreAtIndex(currentFrame, pins);
          addPrevFrame(currentFrame);
          setCurrentFrame(10);
          displayGameEnd();
        }
      }
      setCurrentShotNumber(20);
      //THIRD THROW
    } else if (currentThrow === 3) {
      console.log("10th frame 3rd shot");
      if (pins === 10) {
        addEachScore(currentShotNumber, pins);
        //if last two shots were a strike
        if (lastShotType === 10 && secondLastShotType === 10) {
          setScoreAtIndex(currentFrame, 30);
          addPrevFrame(currentFrame);
          swapLastAndSecondLast();
          setLastShotType(10);
          setCurrentFrame(10);
          displayGameEnd();
          console.log('game shoudlve ended')
        } else {
          //if current shot is a strike and last shot was a spare
          if (lastShotType === 11) {
            swapLastAndSecondLast();
            setScoreAtIndex(currentFrame, 20);
            addPrevFrame(currentFrame);
            setLastShotType(10);
            setCurrentFrame(10);
            displayGameEnd();
          }
        }
      } else if (pins === 11) {
        addEachScore(currentShotNumber, pins);
        if (secondLastShotType === 10) {
          //first shot strike
          swapLastAndSecondLast();
          setScoreAtIndex(currentFrame, 20);
          addPrevFrame(currentFrame);
          setSecondLastShotType(pins);
          setCurrentFrame(10);
          displayGameEnd();
        }
      } else if (pins !== 11 || pins !== 10) {
        addEachScore(currentShotNumber, pins);
        //if third shot is normal (following 2nd shot strike)
        if (lastShotType === 10) {
          swapLastAndSecondLast();
          updateScoreAtIndex(currentFrame, 20 + pins);
          addPrevFrame(currentFrame);
          setSecondLastShotType(pins);
          setCurrentFrame(10);
          displayGameEnd();
        }
        //following a 2nd shot spare
        if (lastShotType === 11) {
          console.log("testing spare into normal");
          swapLastAndSecondLast();
          updateScoreAtIndex(currentFrame, pins);
          addPrevFrame(currentFrame);
          setCurrentFrame(10);
          displayGameEnd();
        }
      }
    }
  };

  const handleThrow = (pins) => {
    console.log("handlethrow clicked with" + pins);
    if (currentFrame === 9) {
      setCurrentThrow(1);
      handleThrow10(pins);
    } else {
      //FIRST THROW
      if (currentThrow === 1) {
        //STRIKE
        if (pins === 10) {
          addEachScore(currentShotNumber + 1, pins);
          //if last two shots were a strike
          if (secondLastShotType === 10) {
            if (currentFrame === 2) {
              setScoreAtIndex(currentFrame - 2, 30);
              swapLastAndSecondLast();
              setLastShotType(10);
              updateScoreAtIndex(currentFrame, 10);
              setCurrentFrame(currentFrame + 1);
              setCurrentShotNumber(currentShotNumber + 2);
            } else {
              setScoreAtIndex(currentFrame - 2, 30);
              addPrevFrame(currentFrame - 2);
              swapLastAndSecondLast();
              setLastShotType(10);
              updateScoreAtIndex(currentFrame, 10);
              setCurrentFrame(currentFrame + 1);
              setCurrentShotNumber(currentShotNumber + 2);
            }
          } else {
            //if current shot is a strike and last shot was a spare
            if (lastShotType === 11) {
              if (currentFrame === 1) {
                swapLastAndSecondLast();
                setScoreAtIndex(0, 20);
                setLastShotType(10);
                setCurrentFrame(currentFrame + 1);
                setCurrentShotNumber(currentShotNumber + 2);
              } else {
                swapLastAndSecondLast();
                setScoreAtIndex(currentFrame - 1, 20);
                addPrevFrame(currentFrame - 1);
                setLastShotType(10);
                setCurrentFrame(currentFrame + 1);
                setCurrentShotNumber(currentShotNumber + 2);
              }
            } else if (lastShotType === 10) {
              //if current shot is a strike and the last shot was a strike
              swapLastAndSecondLast();
              updateScoreAtIndex(currentFrame - 1, 10);
              updateScoreAtIndex(currentFrame, 10);
              setLastShotType(10);
              setCurrentFrame(currentFrame + 1);
              setCurrentShotNumber(currentShotNumber + 2);
            } else {
              //if current shot is strike on normal previous shots
              console.log("hihihi");
              swapLastAndSecondLast();
              updateScoreAtIndex(currentFrame, 10);
              setLastShotType(10);
              setCurrentFrame(currentFrame + 1);
              setCurrentShotNumber(currentShotNumber + 2);
            }
          }
        } else {
          addEachScore(currentShotNumber, pins);
          //NORMAL SHOT
          //if current shot is normal and previous shot was spare
          if (lastShotType === 11) {
            if (currentFrame === 1) {
              setScoreAtIndex(currentFrame - 1, lastShotType - 1 + pins);
              swapLastAndSecondLast();
              updateScoreAtIndex(currentFrame, pins);
              setLastShotType(pins);
              setCurrentThrow(2);
              setCurrentShotNumber(currentShotNumber + 1);
            } else {
              setScoreAtIndex(currentFrame - 1, lastShotType - 1 + pins);
              addPrevFrame(currentFrame - 1);
              swapLastAndSecondLast();
              updateScoreAtIndex(currentFrame, pins);
              setLastShotType(pins);
              setCurrentThrow(2);
              setCurrentShotNumber(currentShotNumber + 1);
            }
          }
          //if current shot is normal and previous shot was strike
          else if (lastShotType === 10) {
            swapLastAndSecondLast();
            updateScoreAtIndex(currentFrame - 1, pins);
            updateScoreAtIndex(currentFrame, pins);
            setLastShotType(pins);
            setCurrentThrow(2);
            setCurrentShotNumber(currentShotNumber + 1);
          } else {
            //if current shot is normal and previous shot is normal
            swapLastAndSecondLast();
            updateScoreAtIndex(currentFrame, pins);
            setLastShotType(pins);
            // addPrevFrame(currentFrame);
            setCurrentThrow(2);
            setCurrentShotNumber(currentShotNumber + 1);
          }
        }
      } else {
        //SECOND THROW
        addEachScore(currentShotNumber, pins);
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
          setCurrentShotNumber(currentShotNumber + 1);
        } else {
          //normal shot
          if (currentFrame === 0) {
            swapLastAndSecondLast();
            updateScoreAtIndex(currentFrame, pins);
            setLastShotType(pins);
            setCurrentFrame(currentFrame + 1);
            setCurrentThrow(1);
            setCurrentShotNumber(currentShotNumber + 1);
          } else {
            if (secondLastShotType === 10) {
              console.log("hi is it here");
              swapLastAndSecondLast();
              updateScoreAtIndex(currentFrame - 1, pins);
              if (currentFrame !== 1) {
                addPrevFrame(currentFrame - 1);
              }
              updateScoreAtIndex(currentFrame, pins);
              addPrevFrame(currentFrame);
              setLastShotType(pins);
              setCurrentFrame(currentFrame + 1);
              setCurrentThrow(1);
              setCurrentShotNumber(currentShotNumber + 1);
            } else {
              //normal shot
              console.log("error clicked");
              swapLastAndSecondLast();
              updateScoreAtIndex(currentFrame, pins);
              setLastShotType(pins);
              setCurrentThrow(1);
              setCurrentFrame(currentFrame + 1);
              addPrevFrame(currentFrame);
              setCurrentShotNumber(currentShotNumber + 1);
            }
          }
        }
      }
    }
  };

  const addEachScore = (shotNumber, pins) => {
    setEachScore((prevEachScore) => {
      const copyEachScore = [...prevEachScore];
      if (pins === 10) {
        copyEachScore[shotNumber] = "X";
        return copyEachScore;
      } else if (pins === 11) {
        copyEachScore[shotNumber] = "/";
        return copyEachScore;
      } else {
        copyEachScore[shotNumber] = pins;
        return copyEachScore;
      }
    });
  };

  // adds the score in current frame with the most recent total score
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
        const currentFrameTotal = copyScores[frameNumber];
        const finalValue = latestScore + currentFrameTotal;
        copyScores[frameNumber] = finalValue;
        return copyScores;
      }
    });
  };

  // updates the score at frame by adding a new value
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

  // sets a new score at given frame
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

  // swaps the last and second last shots
  const swapLastAndSecondLast = () => {
    setSecondLastShotType(lastShotType);
    setLastShotType(null); // Reset lastShotType after swapping
  };


  const userSignOut = () => {
    signOut(auth).then(() => {
      navigate('/login')
      console.log('signout successful')
    }).catch(error => console.log(error))
  }


  return (
    <div>
      <h2>Bowling Score Calculator</h2>
      <div className="frameParent">
        {frames.map((frameNumber) => (
          <div key={frameNumber} className="frame">
            <div className="throw1">{eachScore[(frameNumber - 1) * 2]}</div>
            <div className="throw2">{eachScore[(frameNumber - 1) * 2 + 1]}</div>
            <div className="throwResult">{scores[frameNumber - 1]}</div>
          </div>
        ))}
        <div className="frame10">
          <div className="frame10throw1">{eachScore[18]}</div>
          <div className="frame10throw2">{eachScore[19]}</div>
          <div className="frame10throw3">{eachScore[20]}</div>
          <div className="throwResult">{scores[9]}</div>
        </div>
        <div className="totalScore">Total: {scores[9]}</div>
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

      <Modal show={gameOverModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Game Over!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your total score is: {scores[9]}</p>
          {/* You can customize the modal content as needed */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addToHistory}>
            Add to History
          </Button>
        </Modal.Footer>
      </Modal>


      <Button onClick={userSignOut}>Sign Out</Button>
    </div>
  );
};

export default ScoreCard;
