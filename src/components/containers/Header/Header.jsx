import Button from "../../ui/buttons/Button";
import CloseIcon from "../../ui/icons/Close";
import FiltersIcon from "../../ui/icons/Filters";
import "./Header.scss";
import { useEffect, useRef } from "react";
import useCategoryFilter from "@/hooks/useCategoryFilter";

export default function Header({ onCategoriesClick }) {
  const { selectedCategory, resetCategory } = useCategoryFilter();
  const activeFilter =
    selectedCategory === "all" ? "Tutte le parole" : selectedCategory;
  const ref = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 120) {
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
          selectedCategory === "all" ? (
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
