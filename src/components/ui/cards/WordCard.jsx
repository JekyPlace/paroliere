import "./WordCard.scss";

function WordCard({ word, onClick }) {
  return (
    <div onClick={onClick} className="word-card">
      <h3>{word.Italiano}</h3>
      <img src={word.img}></img>
    </div>
  );
}

export default WordCard;
