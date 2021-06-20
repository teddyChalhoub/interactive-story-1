import "./App.css";
import RoomEscape from "./data/RoomEscape.json";
import SecondOption from "./components/secondOption";
import React, { useState, useEffect } from "react";
import music from "./sound/horrorBackgroundmusic.mp3";
import hint from "./sound/hint.ogg";
import barMusic from "./sound/barMusic.mp3";
import barCrowd from "./sound/barCrowd.wav";
import carPark from "./sound/carPark.wav";
import bar from "./img/bar.jpeg";
import terms from "./img/terms.jpeg";
import riddle1 from "./img/riddle1.jpeg";
import riddle2 from "./img/riddle2.jpg";
import poison from "./img/poison.jpeg";
import redSubstance from "./img/redSubstance.jpeg";
import { AudioPlayerProvider } from "react-use-audio-player";
import { AudioPlayer } from "./components/audioPlayer";

function App(props) {
  const [msgDis, setMsgDis] = useState("");
  const [paging, setPaging] = useState(false);
  const [consequences, isConsequence] = useState(false);
  const [isTrue, setTrue] = useState(false);
  let [count, setCount] = useState(0);
  let [data, setData] = useState(null);
  let [trial, setTrial] = useState(0);
  let [isVisibile, setVisibility] = useState("none");
  let [textValue, setTextValue] = useState("");

  const counter = async () => {
    if (data.id !== 5) {
      count++;
      if (count < 6) {
        setCount(count, handleUpdateData(count));
      }
    } else {
      let audio = new Audio(hint);
      audio.play();
    }

    if (data.id === 6) {
      setPaging(true);
    }
  };

  const handleTextArea = (event) => {
    setTextValue(event.target.value);
  };

  const secondOption = () => {
    if (data.id !== 5) {
      if (data.id !== 3) {
        setPaging(true);
      } else {
        isConsequence(true);
      }
    } else {
      if (textValue !== "respetuosamente tuyo, sin malas intenciones, solo por diversión") {
        if (trial > 0) {
          trial--;
          alert(`Still have on ${trial + 1} trial`);
        } else {
          setVisibility("none");
          setCount(0);
        }
      } else {
        count++;
        setCount(count, handleUpdateData(count));
        setVisibility("none");
      }
    }
  };

  const handleUpdateData = async (counter) => {
    let updatedData = {
      id: RoomEscape[counter].id,
      chapter: RoomEscape[counter][`chapter ${counter + 1}`],
      options: RoomEscape[counter].options,
      consequences: RoomEscape[counter].consequences,
      img: null,
      trials: RoomEscape[counter].trials,
    };

    handleImg(updatedData);

    console.log(updatedData);

    if (updatedData.id === 5) {
      setTrial(updatedData.trials);
      setVisibility("block");
    }

    setData(updatedData);
  };

  const handleImg = (value) => {
    if (value.id === 1) {
      value.img = bar;
    } else if (value.id === 2) {
      value.img = terms;
    } else if (value.id === 3) {
      value.img = riddle1;
    } else if (value.id === 4) {
      value.img = riddle2;
    } else if (value.id === 5) {
      value.img = redSubstance;
    } else if (value.id === 6) {
      value.img = poison;
    }
  };

  const handleTrue = (value, counter) => {
    setTrue(value);
    setCount(counter);
  };

  useEffect(() => {
    if (!isTrue) {
      handleUpdateData(count);
    } else {
      setTrue(false);
      isConsequence(false);
      handleUpdateData(count);
    }
  }, [count]);

  return (
    <div className="App">
      <div style={{ display: msgDis }}>
        <div className="alert"></div>
        <div onClick={() => setMsgDis("none")} className="alert-box">
          <p className="msg">Click Here To Start The Game</p>
        </div>
      </div>
      {paging
        ? data && <SecondOption data={data} />
        : data &&
          (consequences ? (
            <SecondOption
              handleThisTrue={handleTrue}
              consequences={data.consequences}
            />
          ) : (
            <div>
              {data && data.id === 1 ? (
                <div>
                  <AudioPlayerProvider>
                    <AudioPlayer file={barMusic} />
                  </AudioPlayerProvider>
                  <AudioPlayerProvider>
                    <AudioPlayer file={barCrowd} />
                  </AudioPlayerProvider>
                </div>
              ) : data && data.id === 2 ? (
                <AudioPlayerProvider>
                  <AudioPlayer file={carPark} />
                </AudioPlayerProvider>
              ) : (
                <AudioPlayerProvider>
                  <AudioPlayer file={music} />
                </AudioPlayerProvider>
              )}
              <p>{data.chapter}</p>
              {data.img && <img src={data.img} />}
              <div className="buttons">
                {data.options[0] && (
                  <button className="button" onClick={counter.bind(this)}>
                    {data.options[0].answer}
                  </button>
                )}

                {
                  <textarea
                    className="text-area"
                    value={textValue}
                    onChange={handleTextArea.bind(this)}
                    style={{ display: isVisibile }}
                    rows={4}
                    cols={50}
                  ></textarea>
                }

                {data.options[1] && (
                  <button className="button" onClick={secondOption.bind(this)}>
                    {data.options[1].answer}
                  </button>
                )}

                {data.options[2] && (
                  <button className="button" onClick={secondOption.bind(this)}>
                    {data.options[2].answer}
                  </button>
                )}
              </div>
            </div>
          ))}
    </div>
  );
}

export default App;
