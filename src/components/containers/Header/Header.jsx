import Button from "../../ui/buttons/Button";
import CloseIcon from "../../ui/icons/Close";
import FiltersIcon from "../../ui/icons/Filters";
import "./Header.scss";
import useWordsStore from "@/store/wordsStore";
import { useEffect, useRef } from "react";

export default function Header({ onCategoriesClick }) {
  const filterStored = useWordsStore((state) => state.selectedCategory);
  const selectCategory = useWordsStore((state) => state.setSelectedCategory);
  const resetCategory = useWordsStore((state) => state.resetCategory);
  const activeFilter =
    filterStored === "all" ? "Tutte le parole" : filterStored;
  const ref = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        ref.current.classList.add("sticky");
      } else {
        ref.current.classList.remove("sticky");
      }
    });
  }, []);

  return (
    <header ref={ref} className="header">
      <h1 className="title">Paroliere</h1>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onCategoriesClick();
        }}
        iconLeft={<FiltersIcon strokeWidth={"1.6px"} />}
        variant="primary"
        iconRight={
          filterStored === "all" ? (
            ""
          ) : (
            <CloseIcon
              onClick={(e) => {
                e.stopPropagation();
                resetCategory();
              }}
              strokeWidth={"2px"}
            />
          )
        }
      >
        {activeFilter}
      </Button>
    </header>
  );
}
