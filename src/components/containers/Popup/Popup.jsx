import ReactDOM from "react-dom";
import "./Popup.scss";
import useError from "@/hooks/useError";

function Popup() {
  const { error, popupOpen } = useError();

  return ReactDOM.createPortal(
    <div className={`popup ${popupOpen ? "visible" : ""}`}>
      {popupOpen && (
        <>
          <h4>{error.label}</h4>
          <p>{error.message}</p>
        </>
      )}
    </div>,
    document.getElementById("popup"),
  );
}

export default Popup;
