import "./Button.scss";
export default function Button({
  iconLeft,
  iconRight,
  variant,
  onClick,
  children,
}) {
  return (
    <button onClick={onClick} className={`btn ${variant}`}>
      {iconLeft && <span className="icon-left">{iconLeft}</span>}
      {children}
      {iconRight && <span className="icon-right">{iconRight}</span>}
    </button>
  );
}
