import "./SectionHeader.css";

function SectionHeader({
  title,
  subtitle,
  actions,
  className = "",
}) {
  return (
    <div
      className={`
        section-header
        ${className}
      `}
    >
      <div className="section-header__content">
        <h2 className="section-header__title">
          {title}
        </h2>

        {subtitle && (
          <p className="section-header__subtitle">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="section-header__actions">
          {actions}
        </div>
      )}
    </div>
  );
}

export default SectionHeader;
