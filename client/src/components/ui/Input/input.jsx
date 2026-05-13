import "./Input.css";

function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = "",
  inputClassName = "",
  ...props
}) {
  return (
    <div
      className={`
        input-group
        ${fullWidth ? "input-group--full" : ""}
        ${className}
      `}
    >
      {label && <label className="input-label">{label}</label>}

      <div
        className={`
          input-wrapper
          ${error ? "input-wrapper--error" : ""}
        `}
      >
        {leftIcon && <span className="input-icon">{leftIcon}</span>}

        <input
          className={`
            input
            ${inputClassName}
          `}
          {...props}
        />

        {rightIcon && <span className="input-icon">{rightIcon}</span>}
      </div>

      {(helperText || error) && (
        <p
          className={`
            input-message
            ${error ? "input-message--error" : ""}
          `}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}

export default Input;
