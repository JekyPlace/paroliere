import ReactDOM from "react-dom";
import CloseIcon from "../../ui/icons/Close";
import "./Modal.scss";

function Modal({ open, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div className={`modal ${open ? "open" : ""}`}>
        <div className="modal-header">
          <button onClick={onClose}>
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
