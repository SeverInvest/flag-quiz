import "./style.scss";

export default function MyRadioButton({
  type = "radio",
  id = "",
  name = "radio",
  value = "",
  text = "",
  className = "",
  ariaLabel = "",
  disabled = false,
  headerClick = null,
  checked = false,
  onChange = null,
  children,
  ...restProps
}) {
  const classNames = ["radio-label", className, checked ? "radio-label_checked" : ""];

  return (
    <label
      htmlFor={id}
      className={classNames.join(" ")}
      aria-label={ariaLabel}
      {...restProps} >
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        className="radio-input"
        checked={checked}
        onChange={onChange}
      />
      {text}
      {children}
    </label>
  )
}