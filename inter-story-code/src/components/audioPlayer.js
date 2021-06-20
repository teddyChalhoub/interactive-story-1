import React from "react";
import { useAudioPlayer } from "react-use-audio-player";

export const AudioPlayer = ({ file }) => {
  const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
    src: file,
    format: "mp3",
    autoplay: true,
  });

  return <div></div>;
};
