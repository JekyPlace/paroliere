import Audio from "./Audio";
import "./Icons.scss";
import { useRef } from "react";

function AudioCircle({ size, audiofile }) {
  const audioRef = useRef(null);

  const playFile = async () => {
    if (audiofile) {
      if (audioRef.current) {
        await audioRef.current.play();
        return;
      }
    }
    throw new Error("File not found");
  };

  return (
    <div
      onClick={playFile}
      style={{ width: `${size}`, height: `${size}` }}
      className="circle"
    >
      <Audio />
      <audio ref={audioRef} src={`/audio/${audiofile}`} preload="auto"></audio>
    </div>
  );
}

export default AudioCircle;
