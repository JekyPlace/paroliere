import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

export default function useModal() {
  const navigate = useNavigate();
  const { word } = useParams();
  const isOpen = Boolean(word);
  const modalRef = useRef(null);

  const openModal = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const closeModal = (path = "/") => {
    navigate(path);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    modalRef,
  };
}
