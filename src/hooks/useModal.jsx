import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

export default function useModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const { word } = useParams();
  const isOpen = Boolean(word);
  const modalRef = useRef(null);

  const openModal = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const closeModal = (path = "/") => {
    navigate({
      pathname: path,
      search: location.search,
    });
  };

  return {
    isOpen,
    openModal,
    closeModal,
    modalRef,
  };
}
