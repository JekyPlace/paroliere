import { useState } from "react";
import useWordsStore from "@/store/wordsStore";
import CategoriesMenu from "./components/containers/Categories/CategoriesMenu";
import Header from "./components/containers/Header/Header";
import Sidebar from "./components/containers/Sidebar/Sidebar";
import MainContent from "./components/containers/MainContent/MainContent";

function Home() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const words = useWordsStore((state) => state.words);
  return (
    <>
      <CategoriesMenu
        open={categoriesOpen}
        onClose={() => setCategoriesOpen(false)}
      />
      <Header onCategoriesClick={() => setCategoriesOpen(true)} />
      <div className="main">
        <Sidebar />
        <MainContent words={words} />
      </div>
    </>
  );
}

export default Home;
