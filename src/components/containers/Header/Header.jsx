import Button from "../../ui/buttons/Button";
import CloseIcon from "../../ui/icons/Close";
import FiltersIcon from "../../ui/icons/Filters";
import "./Header.scss";

export default function Header({ onCategoriesClick }) {
  const activeFilter = "Tutte le parole";
  return (
    <header className="header">
      <h1 className="title">Paroliere</h1>
      <Button
        onClick={onCategoriesClick}
        iconLeft={<FiltersIcon strokeWidth={"1.6px"} />}
        variant="primary"
        iconRight={<CloseIcon strokeWidth={"2px"} />}
      >
        {activeFilter}
      </Button>
    </header>
  );
}
