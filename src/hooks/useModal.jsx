import { useNavigate } from "react-router-dom";
import useModalStore from "@/store/modalStore";

export default function useModal() {
  const close = useModalStore((state) => state.closeModal);
  const isOpen = useModalStore((state) => state.isOpen);
  const open = useModalStore((state) => state.openModal);
  const navigate = useNavigate();

  const openModal = (path) => {
    open();
    if (path) {
      navigate(path);
    }
  };

  const closeModal = (path) => {
    close();
    if (path) {
      navigate(path);
    }
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
}
