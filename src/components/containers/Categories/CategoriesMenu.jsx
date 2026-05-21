import { createPortal } from "react-dom";
import CloseIcon from "../../ui/icons/Close";
import "./CategoriesMenu.scss";

function CategoriesMenu({ open, onClose }) {
  return createPortal(
    <div className={`categories-menu ${open ? "open" : ""}`}>
      <div className="categories-menu-header">
        <h1 className="title">Scegli la Categoria</h1>
        <div onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
      <ul>
        <li>Categoria 1</li>
        <li>Categoria 2</li>
        <li>Categoria 3</li>
        <li>Categoria 4</li>
        <li>Categoria 5</li>
      </ul>
    </div>,
    document.getElementById("absolute-menu"),
  );
}

export default CategoriesMenu;
