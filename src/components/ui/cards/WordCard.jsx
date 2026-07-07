import "./WordCard.scss";
import publicPath from "@/utils/publicPath";

function WordCard({ word, onClick }) {
  return (
    <article
      style={{
        "--bg-image": `url(${publicPath("words/" + word.Immagine)})`,
      }}
      onClick={onClick}
      className="word-card"
    >
      <header>
        <h3>{word.Italiano}</h3>
      </header>

      <h3 className="category-card-label">{word.Categoria}</h3>
    </article>
  );
}

export default WordCard;
