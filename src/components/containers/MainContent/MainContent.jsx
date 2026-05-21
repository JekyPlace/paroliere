import WordCard from "../../ui/cards/WordCard";
import "./MainContent.scss";
import { useMemo } from "react";
import useModalStore from "@/store/modalStore";
import Modal from "../Modal/Modal";
import getFirstLetters from "@/utils/getFirstLetters";

function MainContent({ words }) {
  const openModal = useModalStore((state) => state.openModal);

  const wordsOrdered = words.sort((a, b) =>
    a.Italiano.localeCompare(b.Italiano),
  );

  const wordsFirstLetters = useMemo(() => {
    return getFirstLetters(wordsOrdered, "Italiano");
  }, [wordsOrdered]);

  return (
    <>
      <main className="main-content">
        {words.length > 0 ? (
          <ul className="words-list">
            {wordsFirstLetters?.map((letter, index) => (
              <li id={letter} className="word-wrapper" key={index}>
                <h2 className="letter">{letter}</h2>
                <ul className="words-by-letter">
                  {wordsOrdered
                    .filter((word) => word.Italiano[0] === letter)
                    .map((word, idx) => (
                      <li key={idx}>
                        <WordCard word={word} onClick={openModal} />
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
