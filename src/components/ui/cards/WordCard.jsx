import "./WordCard.scss";
import normalizeAssetFilename from "@/utils/normalizeAssetFilename";
import publicPath from "@/utils/publicPath";

function WordCard({ word, onClick }) {
  const imageFilename = normalizeAssetFilename(word.Immagine);
  const imageUrl = publicPath(`words/${imageFilename}`);

  return (
    <article
      onClick={onClick}
      className="word-card"
    >
      <img
        className="word-card-image"
        src={imageUrl}
        alt={`Illustrazione di ${word.Italiano}`}
        loading="lazy"
        decoding="async"
      />

      <header>
        <h3>{word.Italiano}</h3>
      </header>

      <h3 className="category-card-label">{word.Categoria}</h3>
    </article>
  );
}

export default WordCard;
