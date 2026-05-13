import "./Card.css";

function Card({
  children,
  title,
  subtitle,
  footer,
  actions,
  variant = "default",
  hover = true,
  padding = "md",
  className = "",
}) {
  return (
    <div
      className={`
        card
        card--${variant}
        card--padding-${padding}
        ${hover ? "card--hover" : ""}
        ${className}
      `}
    >
      {(title || subtitle || actions) && (
        <div className="card__header">
          <div className="card__heading">
            {title && <h3 className="card__title">{title}</h3>}

            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>

          {actions && <div className="card__actions">{actions}</div>}
        </div>
      )}

      <div className="card__content">{children}</div>

      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
}

export default Card;
