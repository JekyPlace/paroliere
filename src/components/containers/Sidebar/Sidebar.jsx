import { memo } from "react";
import "./Sidebar.scss";
import useWordsStore from "@/store/wordsStore";
import getFirstLetters from "@/utils/getFirstLetters";

const AlphabetWithStyle = memo(({ alphabet, firstLetters }) => {
  return alphabet.map((letter) => {
    const isActive = firstLetters.includes(letter);
    return (
      <li
        key={letter}
        className={`sidebar-letter ${isActive ? "active" : "disabled"}`}
      >
        {letter.toUpperCase()}
      </li>
    );
  });
});

function Sidebar() {
  const alphabet = useWordsStore((state) => state.alphabet);
  const words = useWordsStore((state) => state.words);
  const firstLetters = getFirstLetters(words, "Italiano");

  return (
    <aside className="sidebar scroll-hidden">
      <ul className="alphabet-list">
        <AlphabetWithStyle alphabet={alphabet} firstLetters={firstLetters} />
      </ul>
    </aside>
  );
}

export default Sidebar;
