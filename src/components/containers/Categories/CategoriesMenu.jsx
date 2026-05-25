import { createPortal } from "react-dom";
import CloseIcon from "../../ui/icons/Close";
import "./CategoriesMenu.scss";
import useWordsStore from "@/store/wordsStore";

function CategoriesMenu({ open, onClose }) {
  const changeCategory = useWordsStore((state) => state.setSelectedCategory);
  const categoriesByFile = useWordsStore((state) => state.getCategories);
  const setNewWords = useWordsStore((state) => state.setWords);
  const allWords = useWordsStore((state) => state.allWords);

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
          <CloseIcon strokeWidth={2} size={38} color="#fff" />
        </div>
      </div>
      <ul>
        {categoriesByFile().map((category, index) => (
          <li
            className="category-li-item"
            key={index}
            onClick={() => closeMenu(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>,
    document.getElementById("absolute-menu"),
  );
}

export default CategoriesMenu;
