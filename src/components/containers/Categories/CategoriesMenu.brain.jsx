import { useEffect, useRef } from "react";
import useCategoryFilter from "@/hooks/useCategoryFilter";
import useWordsStore from "@/store/wordsStore";

export default function useCategoriesMenu({ open, onClose }) {
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

  return {
    categoriesByFile,
    selectedCategory,
    menuRef,
    closeMenu,
    handleCategoryKeyDown,
  };
}
