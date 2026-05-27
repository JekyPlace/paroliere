import Audio from "./Audio";
import "./Icons.scss";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import publicPath from "@/utils/publicPath";

function AudioCircle({ size, audiofile }) {
  const hasAudioFile = typeof audiofile === "string" && audiofile.trim() !== "";
  const { audioRef, circleRef, playFile } = useAudioPlayer(audiofile);

  return (
    <div
      ref={circleRef}
      onClick={playFile}
      style={{ width: `${size}`, height: `${size}` }}
      className="circle"
    >
      <Audio />
      {hasAudioFile && (
        <audio
          ref={audioRef}
          src={publicPath(`audio/${audiofile}`)}
          preload="none"
        ></audio>
      )}
    </div>
  );
}

export default AudioCircle;
