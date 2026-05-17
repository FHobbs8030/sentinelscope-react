import "./SeverityChartCard.css";

const data = [
  { label: "Critical", value: 14 },
  { label: "High", value: 10 },
  { label: "Medium", value: 6 },
  { label: "Low", value: 3 },
];

function SeverityChartCard() {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <article className="severity-chart-card">
      <div className="severity-chart-card__header">
        <h3 className="severity-chart-card__title">Findings by Severity</h3>
      </div>

      <div className="severity-chart-card__list">
        {data.map((item) => (
          <div className="severity-chart-card__row" key={item.label}>
            <div className="severity-chart-card__meta">
              <span className="severity-chart-card__label">{item.label}</span>
              <span className="severity-chart-card__value">{item.value}</span>
            </div>

            <div className="severity-chart-card__track">
              <div
                className="severity-chart-card__bar"
                style={{
                  width: `${(item.value / max) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default SeverityChartCard;
