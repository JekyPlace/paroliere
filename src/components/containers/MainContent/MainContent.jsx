import { useMemo } from "react";
import WordCard from "../../ui/cards/WordCard";
import "./MainContent.scss";
import Modal from "../Modal/Modal";
import getFirstLetters from "@/utils/getFirstLetters";
import useModal from "@/hooks/useModal";
import useWordsStore from "@/store/wordsStore";
import { useEffect, useRef, useCallback } from "react";

function MainContent({ words }) {
  const selectedLetter = useWordsStore((state) => state.selectedLetter);
  const wordsOrdered = words.sort((a, b) =>
    a.Italiano.localeCompare(b.Italiano),
  );

  const wordsFirstLetters = useMemo(() => {
    return getFirstLetters(wordsOrdered, "Italiano");
  }, [wordsOrdered]);

  const { openModal } = useModal();
  const wordRef = useRef(null);

  const scrollToSelectedLetter = useCallback(() => {
    if (wordRef.current) {
      wordRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [selectedLetter]);

  useEffect(() => {
    scrollToSelectedLetter();
  }, [selectedLetter]);

  return (
    <>
      <main className="main-content">
        {words.length > 0 ? (
          <ul className="words-list">
            {wordsFirstLetters?.map((letter, index) => (
              <li
                ref={selectedLetter === letter ? wordRef : null}
                data-letter={letter}
                id={letter}
                className="word-wrapper"
                key={index}
              >
                <h2 className="letter">{letter}</h2>
                <ul className="words-by-letter">
                  {wordsOrdered
                    .filter((word) => word.Italiano[0] === letter)
                    .map((word, idx) => (
                      <li key={idx}>
                        <WordCard
                          word={word}
                          onClick={() =>
                            openModal(`/word/${word.Italiano.toLowerCase()}`)
                          }
                        />
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No words available.</p>
        )}
      </main>
      <Modal />
    </>
  );
}

export default MainContent;
