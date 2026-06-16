import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import CloseIcon from "../../ui/icons/Close";
import "./CategoriesMenu.scss";
import useWordsStore from "@/store/wordsStore";
import Hand from "@/components/ui/icons/Hand";
import useCategoryFilter from "@/hooks/useCategoryFilter";

function CategoriesMenu({ open, onClose }) {
  const categoriesByFile = useWordsStore((state) => state.getCategories);
  const { selectedCategory, selectCategory } = useCategoryFilter();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    menuRef.current.focus();
  }, [open]);

  const closeMenu = (cat) => {
    selectCategory(cat);
    onClose();
  };

  const handleCategoryKeyDown = (event, category) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    closeMenu(category);
  };

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
        {categoriesByFile().map((category, index) => (
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
        ))}
      </ul>
    </div>,
    document.getElementById("absolute-menu"),
  );
}

export default CategoriesMenu;
