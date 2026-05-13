import "./Badge.css";

function Badge({
  children,
  variant = "default",
  size = "md",
  pill = false,
  outlined = false,
  className = "",
}) {
  return (
    <span
      className={`
        badge
        badge--${variant}
        badge--${size}
        ${pill ? "badge--pill" : ""}
        ${outlined ? "badge--outlined" : ""}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;
