import "./style.scss";

export default function MyButton({
  type="button",
  text="",
  className="",
  ariaLabel="",
  disabled=false,
  headerClick=null,
  children,
  ...restProps
}) {
  const isText = text ? true : false;
  const classNameFont = text.length < 24 ? "" : text.length > 29 ? "button_small" : "button_medium";
  const classNames = ["button", className, classNameFont];

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      className={classNames.join(" ")}
      {...restProps}
    >
      {isText && text}
      {children}
    </button>
  )
}