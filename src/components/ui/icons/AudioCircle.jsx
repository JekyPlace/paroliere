import Audio from "./Audio";
import "./Icons.scss";
import useAudioPlayer from "@/hooks/useAudioPlayer";

function AudioCircle({ size, audiofile }) {
  const { audioRef, circleRef, playFile } = useAudioPlayer(audiofile);

  return (
    <div
      ref={circleRef}
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
