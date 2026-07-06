import WordCard from "../../ui/cards/WordCard";
import "./MainContent.scss";
import Modal from "../Modal/Modal";
import Popup from "../Popup/Popup";
import useMainContent from "./MainContent.brain";

function MainContent({ words }) {
  const {
    scrollTargetLetter,
    wordsOrdered,
    wordsFirstLetters,
    wordRef,
    openWordModal,
  } = useMainContent({ words });

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
                    .map((word, idx) =>
                      word.Italiano.length > 0 ? (
                        <li key={idx}>
                          <WordCard
                            word={word}
                            onClick={() => openWordModal(word)}
                          />
                        </li>
                      ) : null,
                    )}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No words available.</p>
        )}
      </main>
      <Modal />
      <Popup />
    </>
  );
}

export default MainContent;
