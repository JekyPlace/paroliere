import { useState } from "react";
import CategoriesMenu from "./components/containers/Categories/CategoriesMenu";
import Header from "./components/containers/Header/Header";
import Sidebar from "./components/containers/Sidebar/Sidebar";
import MainContent from "./components/containers/MainContent/MainContent";
import useCategoryFilter from "@/hooks/useCategoryFilter";

function Home() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { words } = useCategoryFilter({ syncSelectedLetter: true });

  return (
    <>
      <CategoriesMenu
        open={categoriesOpen}
        onClose={() => setCategoriesOpen(false)}
      />
      <Header onCategoriesClick={() => setCategoriesOpen(true)} />
      <div className="main">
        <Sidebar words={words} />
        <MainContent words={words} />
      </div>
    </>
  );
}

export default Home;
