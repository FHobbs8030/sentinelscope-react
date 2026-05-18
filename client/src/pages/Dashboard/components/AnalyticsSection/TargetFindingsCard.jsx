const data = [
  { label: "api.internal.local", value: 43 },
  { label: "auth.production.net", value: 28 },
  { label: "staging.gateway.dev", value: 17 },
  { label: "vpn.edge.node", value: 12 },
];

function TargetFindingsCard() {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <article className="analytics-card">
      <div className="analytics-card__header">
        <h3 className="analytics-card__title">Target Findings</h3>
      </div>

      <div className="analytics-card__content">
        {data.map((item) => (
          <div className="analytics-card__row" key={item.label}>
            <div className="analytics-card__meta">
              <span className="analytics-card__label">{item.label}</span>

              <span className="analytics-card__value">{item.value}</span>
            </div>

            <div className="analytics-card__track">
              <div
                className="analytics-card__bar"
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

export default TargetFindingsCard;
