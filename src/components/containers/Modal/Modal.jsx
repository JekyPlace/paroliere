import ReactDOM from "react-dom";
import CloseIcon from "../../ui/icons/Close";
import "./Modal.scss";
import AudioCircle from "../../ui/icons/AudioCircle";
import parseMP3 from "@/utils/parseMP3";
import publicPath from "@/utils/publicPath";
import useModal, { useModalDxCol, useModalSxCol } from "./Modal.brain";

const ModalSxCol = ({ wordData }) => {
  const { langs } = useModalSxCol({ wordData });

  if (!wordData) {
    return <div className="modal-col-sx">Word not found</div>;
  }

  return (
    <div className="modal-col-sx">
      <div className="title-wrapper">
        <div className="audio-title">
          <AudioCircle size={"4rem"} iconSize={"2.3rem"} iconColor="#DC0000" />
          <h1 className="modal-title">{wordData.Italiano}</h1>
        </div>
        <p className="modal-descr">{wordData["Descrizione breve"]}</p>
      </div>

      <div className="langs-wrapper">
        {langs.map((lang) => (
          <div key={lang[0]}>
            <h2 className="lang-label">{lang[0]}</h2>
            <div
              className="lang-word-wrapper"
              onClick={(event) => {
                if (event.target.closest(".circle")) return;
                event.currentTarget.querySelector(".circle")?.click();
              }}
            >
              <AudioCircle
                ariaLabel={lang[0]}
                audiofile={parseMP3(lang[0], wordData.Italiano)}
                size={"3rem"}
              />
              <h5>{lang[1]}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ModalDxCol = ({ wordData }) => {
  const { closeModal } = useModalDxCol();
  if (!wordData) {
    return <div className="modal-col-dx">Word not found</div>;
  }
  return (
    <div className="modal-col-dx">
      <button
        type="button"
        onClick={() => closeModal("/")}
        className="close-button"
      >
        <CloseIcon size={"2.2rem"}></CloseIcon>
      </button>
      <img
        className="modal-image"
        src={publicPath(`words/${wordData.Immagine}`)}
      ></img>
    </div>
  );
};

function Modal() {
  const { isOpen, closeModal, modalRef, wordData } = useModal();

  return ReactDOM.createPortal(
    <>
      <div
        className={`overlay ${isOpen ? "visible" : ""}`}
        onClick={() => closeModal("/")}
      ></div>

      <div
        className={`modal ${isOpen ? "open" : ""}`}
        tabIndex={-1}
        ref={modalRef}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            closeModal("/");
          }
        }}
      >
        <ModalSxCol wordData={wordData} />
        <ModalDxCol wordData={wordData} />
      </div>
    </>,
    document.getElementById("modal"),
  );
}

export default Modal;
