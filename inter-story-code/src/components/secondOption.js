import "../App.css";
import oneDollar from "../img/1$.jpeg";
import prison from "../img/prison.jpeg";
import dead from "../img/dead.jpg";
import leave from "../img/leaveBuilding.jpg";
import party from "../img/party.jpg";
import barMusic from "../sound/barMusic.mp3";
import carLeaving from "../sound/carLeaving.wav";
import barCrowd from "../sound/barCrowd.wav";
import congrats from "../sound/congrats.wav";
import gameOver from "../sound/gameOver.wav";
import decision from "../sound/decision.wav";
import React, { useState, useEffect } from "react";
import App from "../App";
import { AudioPlayerProvider } from "react-use-audio-player";
import { AudioPlayer } from "./audioPlayer";

function SecondOption(props) {
  console.log(props.data);
  console.log(props.consequences);
  const [goBack, setBack] = useState(false);
  const [img, isImg] = useState(false);
  const [img2, isImg2] = useState(false);

  return goBack ? (
    <App />
  ) : (
    <div>
      {props.data && (
        <div>
          {props.data.id === 1 ? (
            <div className="secondImg">
              <AudioPlayerProvider>
                <AudioPlayer file={barMusic} />
              </AudioPlayerProvider>
              <AudioPlayerProvider>
                <AudioPlayer file={barCrowd} />
              </AudioPlayerProvider>
              <img src={party}></img>
            </div>
          ) : props.data.id === 2 ? (
            <div className="secondImg">
              <AudioPlayerProvider>
                <AudioPlayer file={carLeaving} />
              </AudioPlayerProvider>
              <img src={leave}></img>
            </div>
          ) : props.data.id === 6 ? (
            <div className="secondImg">
              <AudioPlayerProvider>
                <AudioPlayer file={congrats} />
              </AudioPlayerProvider>
              <img src={oneDollar}></img>
            </div>
          ) : (
            <div className="secondImg">
              <AudioPlayerProvider>
                <AudioPlayer file={gameOver} />
              </AudioPlayerProvider>
              <img src={dead}></img>
            </div>
          )}
        </div>
      )}
      {props.consequences && (
        <div>
          {img ? (
            <div className="secondImg">
              <AudioPlayerProvider>
                <AudioPlayer file={gameOver} />
              </AudioPlayerProvider>
              <img src={dead} />
            </div>
          ) : (
            <div>
              <p>
                You answered Wrong.What a pitty for you of course? You have Two
                choices know? Choose wisely my friends
              </p>
              <AudioPlayerProvider>
                <AudioPlayer file={decision} />
              </AudioPlayerProvider>
              <img src={prison} />
              <div className="buttons">
                {props.consequences[0] && (
                  <button
                    className="button"
                    onClick={(event) => {
                      props.handleThisTrue(true, 3);
                      isImg2(true);
                      setBack(true);
                      event.preventDefault();
                    }}
                  >
                    {props.consequences[0]}
                  </button>
                )}
                {props.consequences[1] && (
                  <button onClick={() => isImg(true)} className="button">
                    {props.consequences[1]}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SecondOption;
