import CategoriesMenu from "./components/containers/Categories/CategoriesMenu";
import Header from "./components/containers/Header/Header";
import { useState } from "react";

function Home() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  return (
    <>
      <CategoriesMenu
        open={categoriesOpen}
        onClose={() => setCategoriesOpen(false)}
      />
      <Header onCategoriesClick={() => setCategoriesOpen(true)} />
    </>
  );
}

export default Home;
