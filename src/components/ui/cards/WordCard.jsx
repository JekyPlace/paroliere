import "./WordCard.scss";

function WordCard({ word, onClick }) {
  return (
    <article onClick={onClick} className="word-card">
      <header>
        <h3>{word.Italiano}</h3>
      </header>
      <main>
        <img src={`/words/${word.Immagine}`}></img>
      </main>
    </article>
  );
}

export default WordCard;
