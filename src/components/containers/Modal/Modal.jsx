import ReactDOM from "react-dom";
import CloseIcon from "../../ui/icons/Close";
import "./Modal.scss";
import useModalStore from "@/store/modalStore";

function Modal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const setClose = useModalStore((state) => state.closeModal);

  return ReactDOM.createPortal(
    <>
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-header">
          <button onClick={setClose} className="close-button">
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
