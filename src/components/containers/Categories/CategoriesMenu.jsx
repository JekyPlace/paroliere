import { createPortal } from "react-dom";
import CloseIcon from "../../ui/icons/Close";
import "./CategoriesMenu.scss";
import useWordsStore from "@/store/wordsStore";
import Hand from "@/components/ui/icons/Hand";

function CategoriesMenu({ open, onClose }) {
  const changeCategory = useWordsStore((state) => state.setSelectedCategory);
  const categoriesByFile = useWordsStore((state) => state.getCategories);
  const setNewWords = useWordsStore((state) => state.setWords);
  const allWords = useWordsStore((state) => state.allWords);
  const selectedCategory = useWordsStore((state) => state.selectedCategory);

  const closeMenu = (cat) => {
    changeCategory(cat);
    const newWords = allWords.filter((word) => word.Categoria === cat);
    setNewWords(newWords);
    onClose();
  };

  return createPortal(
    <div className={`categories-menu ${open ? "open" : ""}`}>
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
          >
            <span>{selectedCategory === category && <Hand />}</span>
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </div>,
    document.getElementById("absolute-menu"),
  );
}

export default CategoriesMenu;
