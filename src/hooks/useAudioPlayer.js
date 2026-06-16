import { useCallback, useEffect, useRef } from "react";
import useErrorStore from "@/store/errorStore";
import publicPath from "@/utils/publicPath";

let currentAudioElement = null;
let currentCircleElement = null;

export default function useAudioPlayer(audiofile) {
  const audioRef = useRef(null);
  const circleRef = useRef(null);
  const setError = useErrorStore((state) => state.setError);

  const addPlayingClass = useCallback(() => {
    if (!circleRef.current) return;

    circleRef.current.classList.add("playing");
  }, []);

  const removePlayingClass = useCallback(() => {
    if (!circleRef.current) return;

    circleRef.current.classList.remove("playing");
  }, []);

  const showAudioError = useCallback(() => {
    setError({
      label: "Errore di riproduzione",
      message: "Audio non supportato per questa lingua",
    });
  }, [setError]);

  const stopCurrentAudio = useCallback(() => {
    if (!currentAudioElement) return;

    currentAudioElement.pause();
    currentAudioElement.currentTime = 0;
    currentCircleElement?.classList.remove("playing");

    currentAudioElement = null;
    currentCircleElement = null;
  }, []);

  const playFile = useCallback(async () => {
    if (!audiofile) {
      showAudioError();
      return;
    }

    const audioSrc = publicPath(`audio/${audiofile}`);

    try {
      const response = await fetch(audioSrc, { method: "HEAD" });

      if (!response.ok || !audioRef.current) {
        showAudioError();
        return;
      }

      if (currentAudioElement && currentAudioElement !== audioRef.current) {
        stopCurrentAudio();
      }

      currentAudioElement = audioRef.current;
      currentCircleElement = circleRef.current;

      await audioRef.current.play();
    } catch {
      showAudioError();
      return;
    }

    addPlayingClass();
  }, [addPlayingClass, audiofile, showAudioError, stopCurrentAudio]);

  const handleEnded = useCallback(() => {
    removePlayingClass();

    if (currentAudioElement !== audioRef.current) return;

    currentAudioElement = null;
    currentCircleElement = null;
  }, [removePlayingClass]);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) return;

    audioElement.addEventListener("ended", handleEnded);
    audioElement.addEventListener("error", showAudioError);

    return () => {
      if (currentAudioElement === audioElement) {
        stopCurrentAudio();
      }

      audioElement.removeEventListener("ended", handleEnded);
      audioElement.removeEventListener("error", showAudioError);
    };
  }, [handleEnded, showAudioError, stopCurrentAudio]);

  return {
    audioRef,
    circleRef,
    playFile,
  };
}
