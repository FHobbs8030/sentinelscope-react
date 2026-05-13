import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

import "./StatCard.css";

function StatCard({
  title,
  value,
  icon,
  trend,
  trendLabel,
  status,
  footer,
  variant = "default",
}) {
  return (
    <Card
      className="stat-card"
      variant={variant}
      hover
    >
      <div className="stat-card__top">
        <div className="stat-card__icon">
          {icon}
        </div>

        {status && (
          <Badge
            variant={status.variant}
            pill
            size="sm"
          >
            {status.label}
          </Badge>
        )}
      </div>

      <div className="stat-card__body">
        <span className="stat-card__title">
          {title}
        </span>

        <h2 className="stat-card__value">
          {value}
        </h2>

        {(trend || trendLabel) && (
          <div className="stat-card__trend">
            {trend && (
              <span
                className={`
                  stat-card__trend-value
                  ${trend >= 0
                    ? "stat-card__trend-positive"
                    : "stat-card__trend-negative"}
                `}
              >
                {trend >= 0 ? "+" : ""}
                {trend}%
              </span>
            )}

            {trendLabel && (
              <span className="stat-card__trend-label">
                {trendLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {footer && (
        <div className="stat-card__footer">
          {footer}
        </div>
      )}
    </Card>
  );
}

export default StatCard;
