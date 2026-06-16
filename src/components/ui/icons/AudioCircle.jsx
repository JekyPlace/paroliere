import { useEffect, useState } from "react";
import Audio from "./Audio";
import "./Icons.scss";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import publicPath from "@/utils/publicPath";

function AudioCircle({ size, iconSize, iconColor, audiofile, ariaLabel }) {
  const hasAudioFile = typeof audiofile === "string" && audiofile.trim() !== "";
  const [checkedAudio, setCheckedAudio] = useState({
    audiofile: null,
    exists: true,
  });
  const { audioRef, circleRef, playFile } = useAudioPlayer(audiofile);
  const isCurrentAudioChecked = checkedAudio.audiofile === audiofile;
  const isUnavailable =
    hasAudioFile && isCurrentAudioChecked && !checkedAudio.exists;

  useEffect(() => {
    if (!hasAudioFile) return;

    let ignore = false;

    fetch(publicPath(`audio/${audiofile}`), { method: "HEAD" })
      .then((response) => {
        const contentType = response.headers.get("content-type") ?? "";

        if (!ignore) {
          setCheckedAudio({
            audiofile,
            exists: response.ok && contentType.includes("audio"),
          });
        }
      })
      .catch(() => {
        if (!ignore) {
          setCheckedAudio({
            audiofile,
            exists: false,
          });
        }
      });

    return () => {
      ignore = true;
    };
  }, [audiofile, hasAudioFile]);

  return (
    <div
      aria-label={`Play ${ariaLabel}`}
      ref={circleRef}
      onClick={playFile}
      style={{ width: `${size}`, height: `${size}` }}
      className={`circle ${isUnavailable ? "disabled" : ""}`}
    >
      <Audio size={iconSize} color={iconColor} />
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
