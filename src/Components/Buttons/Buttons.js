import React from "react";
import './Buttons.css'

//Calculates the current time of the player
const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const Buttons = ({
      playPause,
      stop,
      toggleLoop,
      currentTime,
  }) => {
      return (
          <div className="buttons">
              <div>
                <button onClick={playPause}>Play or Pause</button>
                <button onClick={stop}>Stop</button> 
                <button onClick={toggleLoop}>Loop</button> 
              </div>
              {calculateTime(currentTime)}
          </div>
      );
  };

export default Buttons;