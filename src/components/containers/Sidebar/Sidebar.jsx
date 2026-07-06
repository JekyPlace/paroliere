import { memo } from "react";
import "./Sidebar.scss";
import useSidebar, { useAlphabetWithStyle } from "./Sidebar.brain";

const AlphabetWithStyle = memo(({ alphabet, firstLetters }) => {
  const { selectedLetter, wordRef, changeSelectedLetter } =
    useAlphabetWithStyle();

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

function Sidebar({ words }) {
  const { alphabet, sidebarRef, firstLetters } = useSidebar({ words });

  return (
    <aside ref={sidebarRef} className="sidebar scroll-hidden">
      <ul className="alphabet-list">
        <AlphabetWithStyle alphabet={alphabet} firstLetters={firstLetters} />
      </ul>
    </aside>
  );
}

export default Sidebar;
