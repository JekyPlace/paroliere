import ReactDOM from "react-dom";
import CloseIcon from "../../ui/icons/Close";
import "./Modal.scss";
import useModal from "@/hooks/useModal";
import { useParams } from "react-router-dom";
import useWordsStore from "@/store/wordsStore";
import Audio from "../../ui/icons/Audio";

const ModalContent = ({ wordData }) => {
  if (!wordData) {
    return <div className="modal-content">Word not found</div>;
  }

  return (
    <>
      <Audio />
      <h1>{wordData.Italiano}</h1>
    </>
  );
};

function Modal() {
  const { isOpen, closeModal } = useModal();
  const { word } = useParams();
  const findWordByItaliano = useWordsStore((state) => state.findWordByItaliano);
  const wordData = findWordByItaliano(word);

  return ReactDOM.createPortal(
    <>
      <div
        className={`overlay ${isOpen ? "visible" : ""}`}
        onClick={() => closeModal("/")}
      ></div>
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-header">
          <button onClick={() => closeModal("/")} className="close-button">
            <CloseIcon></CloseIcon>
          </button>
        </div>
        <ModalContent wordData={wordData} />
      </div>
    </>,
    document.getElementById("modal"),
  );
}

export default Modal;
