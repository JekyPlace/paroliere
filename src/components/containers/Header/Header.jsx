import Button from "../../ui/buttons/Button";
import CloseIcon from "../../ui/icons/Close";
import FiltersIcon from "../../ui/icons/Filters";
import "./Header.scss";
import useHeader from "./Header.brain";

export default function Header({ onCategoriesClick }) {
  const { activeFilter, selectedCategory, resetCategory, ref } = useHeader();

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
        <span className="active-filter">{activeFilter}</span>
      </Button>
    </header>
  );
}
