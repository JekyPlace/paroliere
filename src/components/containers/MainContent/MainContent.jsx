import "./MainContent.scss";
import { useMemo } from "react";

function MainContent({ words }) {
  console.log("Words in MainContent:", words);

  const wordsOrdered = words.sort((a, b) =>
    a.Italiano.localeCompare(b.Italiano),
  );

  const wordsFirstLetters = useMemo(() => {
    const letters = wordsOrdered.reduce((acc, word) => {
      return acc.includes(word.Italiano[0]) ? acc : [...acc, word.Italiano[0]];
    }, []);
    return letters;
  }, [wordsOrdered]);

  return (
    <main className="main-content">
      {words.length > 0 ? (
        <ul className="words-list">
          {wordsFirstLetters?.map((letter, index) => (
            <li class="word-wrapper" key={index}>
              <h2 className="letter">{letter}</h2>
              <ul>
                {wordsOrdered
                  .filter((word) => word.Italiano[0] === letter)
                  .map((word, idx) => (
                    <li key={idx}>{word.Italiano}</li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No words available.</p>
      )}
    </main>
  );
}

export default MainContent;
