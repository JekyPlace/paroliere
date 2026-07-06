import useError from "@/hooks/useError";

export default function usePopup() {
  const { error, popupOpen } = useError();

  return {
    error,
    popupOpen,
  };
}
