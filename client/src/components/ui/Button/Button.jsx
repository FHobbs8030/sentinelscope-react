import "./Button.css";

function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        button
        button--${variant}
        button--${size}
        ${fullWidth ? "button--full" : ""}
        ${loading ? "button--loading" : ""}
        ${className}
      `}
    >
      {leftIcon && (
        <span className="button__icon">
          {leftIcon}
        </span>
      )}

      <span className="button__label">
        {loading ? "Loading..." : children}
      </span>

      {rightIcon && !loading && (
        <span className="button__icon">
          {rightIcon}
        </span>
      )}
    </button>
  );
}

export default Button;
