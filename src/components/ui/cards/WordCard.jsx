import "./WordCard.scss";
import publicPath from "@/utils/publicPath";

function WordCard({ word, onClick }) {
  return (
    <article onClick={onClick} className="word-card">
      <header>
        <h3>{word.Italiano}</h3>
      </header>
      <main>
        <img src={publicPath(`words/${word.Immagine}`)}></img>
      </main>
    </article>
  );
}

export default WordCard;
