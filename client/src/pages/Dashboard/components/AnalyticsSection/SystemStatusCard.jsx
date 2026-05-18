const statuses = [
  {
    label: "Scanner Engine",
    status: "Online",
  },
  {
    label: "Threat Database",
    status: "Synced",
  },
  {
    label: "Queue Processor",
    status: "Healthy",
  },
  {
    label: "API Gateway",
    status: "Operational",
  },
];

function SystemStatusCard() {
  return (
    <article className="analytics-card">
      <div className="analytics-card__header">
        <h3 className="analytics-card__title">System Status</h3>
      </div>

      <div className="analytics-card__content">
        {statuses.map((item) => (
          <div className="analytics-status-row" key={item.label}>
            <div className="analytics-status-info">
              <span className="analytics-status-dot" />

              <span className="analytics-card__label">{item.label}</span>
            </div>

            <span className="analytics-status-value">{item.status}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default SystemStatusCard;
