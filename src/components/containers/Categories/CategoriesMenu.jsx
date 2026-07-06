import { createPortal } from "react-dom";
import CloseIcon from "../../ui/icons/Close";
import "./CategoriesMenu.scss";
import Hand from "@/components/ui/icons/Hand";
import useCategoriesMenu from "./CategoriesMenu.brain";

function CategoriesMenu({ open, onClose }) {
  const {
    categoriesByFile,
    selectedCategory,
    menuRef,
    closeMenu,
    handleCategoryKeyDown,
  } = useCategoriesMenu({ open, onClose });

  return createPortal(
    <div
      ref={menuRef}
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      className={`categories-menu ${open ? "open" : ""}`}
    >
      <div className="categories-menu-header">
        <h1 className="title">Scegli la Categoria</h1>
        <div onClick={onClose}>
          <CloseIcon
            className="close-icon"
            strokeWidth={2}
            size={38}
            color="#fff"
          />
        </div>
      </div>
      <ul className="categories-list">
        {categoriesByFile().map((category, index) =>
          category.length > 0 ? (
            <li
              className="category-li-item"
              key={index}
              onClick={() => closeMenu(category)}
              onKeyDown={(event) => handleCategoryKeyDown(event, category)}
              tabIndex={0}
              aria-current={selectedCategory === category ? "true" : undefined}
            >
              <span
                className={`category-hand ${
                  selectedCategory === category ? "visible" : ""
                }`}
              >
                <Hand />
              </span>
              <span>{category}</span>
            </li>
          ) : null,
        )}
      </ul>
    </div>,
    document.getElementById("absolute-menu"),
  );
}

export default CategoriesMenu;
