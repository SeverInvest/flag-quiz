import "./style.scss";

export default function InfoCountry({ text }) {
  return (
    <div className="article">
      <p className="article__text">{text}</p>
    </div>
  )
}