import ReactDOM from "react-dom";
import CloseIcon from "../../ui/icons/Close";
import "./Modal.scss";
import useModal from "@/hooks/useModal";

function Modal() {
  const { isOpen, closeModal } = useModal();

  return ReactDOM.createPortal(
    <>
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-header">
          <button onClick={() => closeModal("/")} className="close-button">
            <CloseIcon></CloseIcon>
          </button>
        </div>
        <div>
          <h1>Modal</h1>
        </div>
      </div>
    </>,
    document.getElementById("modal"),
  );
}

export default Modal;
