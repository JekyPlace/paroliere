import Audio from "./Audio";
import "./Icons.scss";

function AudioCircle({ size, playAudio }) {
  return (
    <div style={{ width: `${size}`, height: `${size}` }} className="circle">
      <Audio onClick={playAudio} />
    </div>
  );
}

export default AudioCircle;
