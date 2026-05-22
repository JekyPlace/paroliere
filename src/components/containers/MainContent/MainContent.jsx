import { useMemo } from "react";
import WordCard from "../../ui/cards/WordCard";
import "./MainContent.scss";
import Modal from "../Modal/Modal";
import getFirstLetters from "@/utils/getFirstLetters";
import useModal from "@/hooks/useModal";
import useWordsStore from "@/store/wordsStore";
import { useEffect, useRef, useCallback } from "react";

function MainContent({ words }) {
  const scrollTargetLetter = useWordsStore((state) => state.scrollTargetLetter);

  const wordsOrdered = words.sort((a, b) =>
    a.Italiano.localeCompare(b.Italiano),
  );

  const wordsFirstLetters = useMemo(() => {
    return getFirstLetters(wordsOrdered, "Italiano");
  }, [wordsOrdered]);

  const { openModal } = useModal();
  const wordRef = useRef(null);
  const isAutoScrolling = useRef(false);
  const autoScrollTimeout = useRef(null);

  const scrollToTargetLetter = useCallback((targetLetter) => {
    if (!targetLetter) return;

    if (wordRef.current) {
      isAutoScrolling.current = true;
      wordRef.current.scrollIntoView({
        behavior: "smooth",
      });

      window.clearTimeout(autoScrollTimeout.current);
      autoScrollTimeout.current = window.setTimeout(() => {
        isAutoScrolling.current = false;
        useWordsStore.setState({ selectedLetter: targetLetter });
      }, 700);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (isAutoScrolling.current) return;

    const wordWrappers = document.querySelectorAll(".word-wrapper");
    const activationOffset = window.innerHeight * 0.35;
    let activeLetter = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    wordWrappers.forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      const letter = wrapper.getAttribute("data-letter");
      const isInViewport = rect.top <= activationOffset && rect.bottom >= 0;

      if (!isInViewport) return;

      const distance = Math.abs(rect.top - activationOffset);

      if (distance < closestDistance) {
        activeLetter = letter;
        closestDistance = distance;
      }
    });

    const currentSelectedLetter = useWordsStore.getState().selectedLetter;

    if (activeLetter && activeLetter !== currentSelectedLetter) {
      useWordsStore.setState({ selectedLetter: activeLetter });
    }
  }, []);

  useEffect(() => {
    scrollToTargetLetter(scrollTargetLetter);
  }, [scrollTargetLetter, scrollToTargetLetter]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(autoScrollTimeout.current);
    };
  }, [handleScroll]);

  return (
    <>
      <main className="main-content">
        {words.length > 0 ? (
          <ul className="words-list">
            {wordsFirstLetters?.map((letter, index) => (
              <li
                ref={scrollTargetLetter === letter ? wordRef : null}
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
