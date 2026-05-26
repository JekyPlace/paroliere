import { useCallback, useEffect, useRef } from "react";

export default function useAudioPlayer(audiofile) {
  const audioRef = useRef(null);
  const circleRef = useRef(null);

  const addPlayingClass = useCallback(() => {
    if (!circleRef.current) return;

    circleRef.current.classList.add("playing");
  }, []);

  const removePlayingClass = useCallback(() => {
    if (!circleRef.current) return;

    circleRef.current.classList.remove("playing");
  }, []);

  const playFile = useCallback(async () => {
    if (!audiofile || !audioRef.current) return;

    await audioRef.current.play();
    addPlayingClass();
  }, [addPlayingClass, audiofile]);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) return;

    audioElement.addEventListener("ended", removePlayingClass);

    return () => {
      audioElement.removeEventListener("ended", removePlayingClass);
    };
  }, [removePlayingClass]);

  return {
    audioRef,
    circleRef,
    playFile,
  };
}
