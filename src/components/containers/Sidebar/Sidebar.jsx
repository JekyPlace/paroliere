import { memo, useEffect, useRef } from "react";
import "./Sidebar.scss";
import useWordsStore from "@/store/wordsStore";
import getFirstLetters from "@/utils/getFirstLetters";
import useManipulateLetters from "@/hooks/useManipulateLetters";

const AlphabetWithStyle = memo(({ alphabet, firstLetters }) => {
  const selectedLetter = useWordsStore((state) => state.selectedLetter);
  const wordRef = useRef(null);
  const { changeSelectedLetter } = useManipulateLetters();

  return alphabet.map((letter) => {
    const isActive = firstLetters.includes(letter);
    return (
      <li
        ref={letter === selectedLetter ? wordRef : null}
        key={letter}
        className={`sidebar-letter ${isActive ? "active" : "disabled"}`}
        data-letter={letter}
        onClick={(event) => changeSelectedLetter(letter, event, wordRef)}
      >
        {selectedLetter === letter ? (
          <span className="sidebar-char selected">{letter.toUpperCase()}</span>
        ) : (
          <span className="sidebar-char">{letter.toUpperCase()}</span>
        )}
      </li>
    );
  });
});

function Sidebar() {
  const alphabet = useWordsStore((state) => state.alphabet);
  const words = useWordsStore((state) => state.words);
  const selectedLetter = useWordsStore((state) => state.selectedLetter);
  const sidebarRef = useRef(null);
  const firstLetters = getFirstLetters(words, "Italiano");

  useEffect(() => {
    if (!selectedLetter || !sidebarRef.current) return;

    const sidebar = sidebarRef.current;
    const selectedItem = sidebar.querySelector(
      `[data-letter="${selectedLetter}"]`,
    );

    if (!selectedItem) return;

    const nextScrollTop =
      selectedItem.offsetTop -
      sidebar.clientHeight / 2 +
      selectedItem.clientHeight / 2;

    sidebar.scrollTo({
      top: nextScrollTop,
      behavior: "smooth",
    });
  }, [selectedLetter]);

  return (
    <aside ref={sidebarRef} className="sidebar scroll-hidden">
      <ul className="alphabet-list">
        <AlphabetWithStyle alphabet={alphabet} firstLetters={firstLetters} />
      </ul>
    </aside>
  );
}

export default Sidebar;
