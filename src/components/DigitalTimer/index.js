import "./index.css";
import { useState, useEffect, useRef, useCallback } from "react";

const DigitalTimer = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [timerLimitInMinutes, setTimerLimitInMinutes] = useState(25);
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(0);
  const intervalId = useRef(null);

  const isButtonsDisabled = timeElapsedInSeconds > 0;

  const icon = isStarted
    ? "https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
    : "https://assets.ccbp.in/frontend/react-js/play-icon-img.png";

  const alt = isStarted ? "pause icon" : "play icon";
  const iconName = isStarted ? "Pause" : "Play";

  // Memoize the increment function
  const incrementTimeElapsedInSeconds = useCallback(() => {
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60;
    if (isTimerCompleted) {
      clearInterval(intervalId.current);
      setIsStarted(false);
    } else {
      setTimeElapsedInSeconds((prev) => prev + 1);
    }
  }, [timeElapsedInSeconds, timerLimitInMinutes]);

  useEffect(() => {
    if (isStarted) {
      intervalId.current = setInterval(incrementTimeElapsedInSeconds, 1000);
    } else {
      clearInterval(intervalId.current);
    }

    return () => clearInterval(intervalId.current); // Cleanup on unmount
  }, [isStarted, incrementTimeElapsedInSeconds]); // Include incrementTimeElapsedInSeconds

  const onStartOrPauseTimer = () => {
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60;

    if (isTimerCompleted) {
      setTimeElapsedInSeconds(0);
    }
    setIsStarted((prev) => !prev);
  };

  const onResetTimer = () => {
    clearInterval(intervalId.current);
    setIsStarted(false);
    setTimerLimitInMinutes(25); // Reset to initial value
    setTimeElapsedInSeconds(0);
  };

  const onDecrementTimer = () => {
    if (!isStarted && timerLimitInMinutes > 1) {
      setTimerLimitInMinutes((prev) => prev - 1);
    }
  };

  const onIncrementTimer = () => {
    if (!isStarted) {
      setTimerLimitInMinutes((prev) => prev + 1);
    }
  };

  const getElapsedSecondsInTimeFormat = () => {
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds;
    const minutes = Math.floor(totalRemainingSeconds / 60);
    const seconds = Math.floor(totalRemainingSeconds % 60);
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`;
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`;

    return `${stringifiedMinutes}:${stringifiedSeconds}`;
  };

  // useEffect(() => {
  //   return () => {
  //     clearTimerInterval();
  //   };
  // }, []);

  // const clearTimerInterval = () => {
  //   clearInterval(intervalId);
  // };

  // const onDecrementTimer = () => {
  //   // if (isStarted === false) {
  //   //   setTimerLimitInMinutes(timerLimitInMinutes - 1);
  //   // }
  //   if (timerLimitInMinutes > 1) {
  //     setTimerLimitInMinutes(timerLimitInMinutes - 1);
  //   }
  // };

  // const onIncrementTimer = () => {
  //   // if (isStarted === false) {
  //   //   setTimerLimitInMinutes(timerLimitInMinutes + 1);
  //   // }
  //   setTimerLimitInMinutes(timerLimitInMinutes + 1);
  // };

  // const onResetTimer = () => {
  //   clearTimerInterval();
  //   setIsStarted(false);
  //   setTimerLimitInMinutes(timerLimitInMinutes);
  //   setTimeElapsedInSeconds(0);
  // };

  // const incrementTimeElapsedInSeconds = () => {
  //   const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60;
  //   if (isTimerCompleted) {
  //     clearTimerInterval();
  //     setIsStarted(false);
  //   } else {
  //     setTimeElapsedInSeconds(timeElapsedInSeconds + 1);
  //   }
  // };

  // const onStartOrPauseTimer = () => {
  //   const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60;

  //   if (isTimerCompleted) {
  //     setTimeElapsedInSeconds(0);
  //   }
  //   if (isStarted) {
  //     clearTimerInterval();
  //   } else {
  //     const intervalId = setInterval(incrementTimeElapsedInSeconds, 1000);
  //   }
  //   setIsStarted(!isStarted);
  // };

  // const getElapsedSecondsInTimeFormat = () => {
  //   const totalRemainingSeconds =
  //     timerLimitInMinutes * 60 - timeElapsedInSeconds;
  //   const minutes = Math.floor(totalRemainingSeconds / 60);
  //   const seconds = Math.floor(totalRemainingSeconds % 60);
  //   const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`;
  //   const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`;

  //   return `${stringifiedMinutes}:${stringifiedSeconds}`;
  // };

  return (
    <>
      <div className="app-container">
        <div className="digital-timer-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="timer-main-container">
            <div className="timer-container">
              <div className="timer-inner-container">
                <h1 className="timer">{getElapsedSecondsInTimeFormat()}</h1>
                <p className="status">{isStarted ? "Running" : "Paused"}</p>
              </div>
            </div>
            <div className="timer-controller-container">
              <div className="start-reset-container">
                <div className="icon-and-name-container">
                  <button className="button" onClick={onStartOrPauseTimer}>
                    <img className="icon" src={icon} alt={alt} />
                  </button>

                  <p className="icon-name">{iconName}</p>
                </div>
                <div className="icon-and-name-container">
                  <button className="button" onClick={onResetTimer}>
                    <img
                      className="icon"
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                    />
                  </button>

                  <p className="icon-name">Reset</p>
                </div>
              </div>
              <p>Set Timer Limit</p>
              <div className="plus-minus-container">
                <button
                  disabled={isButtonsDisabled}
                  className="sign"
                  onClick={onDecrementTimer}
                  type="button"
                >
                  -
                </button>
                <p className="timer-count">{timerLimitInMinutes}</p>
                <button
                  disabled={isButtonsDisabled}
                  className="sign"
                  onClick={onIncrementTimer}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalTimer;
