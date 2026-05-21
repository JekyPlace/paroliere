import "./WordCard.scss";

function WordCard({ word }) {
  return (
    <div className="word-card">
      <h3>{word.Italiano}</h3>
      <img src={word.img}></img>
    </div>
  );
}

export default WordCard;
