import { useCallback, useEffect, useRef } from "react";
import useErrorStore from "@/store/errorStore";
import publicPath from "@/utils/publicPath";

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

      await audioRef.current.play();
    } catch {
      showAudioError();
      return;
    }

    addPlayingClass();
  }, [addPlayingClass, audiofile, showAudioError]);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) return;

    audioElement.addEventListener("ended", removePlayingClass);
    audioElement.addEventListener("error", showAudioError);

    return () => {
      audioElement.removeEventListener("ended", removePlayingClass);
      audioElement.removeEventListener("error", showAudioError);
    };
  }, [removePlayingClass, showAudioError]);

  return {
    audioRef,
    circleRef,
    playFile,
  };
}
