import { useEffect } from "react";
import useErrorStore from "../store/errorStore";

export default function useError() {
  const error = useErrorStore((state) => state.error);
  const clearError = useErrorStore((state) => state.clearError);
  const isError = Boolean(error);
  const popupOpen = Boolean(error?.label && error?.message);

  useEffect(() => {
    if (!popupOpen) return;

    const timeoutId = window.setTimeout(() => {
      clearError();
    }, 1500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [clearError, popupOpen]);

  return { error, isError, popupOpen };
}
