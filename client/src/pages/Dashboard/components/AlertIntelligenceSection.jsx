import "./AlertIntelligenceSection.css";

import useAlerts from "../../../hooks/useAlerts";

function AlertIntelligenceSection() {
  const { metrics, alertRiskScore } = useAlerts();

  const alertData = [
    {
      id: 1,
      label: "Open Alerts",
      value: metrics.openAlerts,
      trend: "Require analyst review",
      status: metrics.openAlerts > 0 ? "warning" : "positive",
    },

    {
      id: 2,
      label: "Critical Alerts",
      value: metrics.criticalAlerts,
      trend: "Immediate response required",
      status: metrics.criticalAlerts > 0 ? "critical" : "positive",
    },

    {
      id: 3,
      label: "High Alerts",
      value: metrics.highAlerts,
      trend: "Elevated threat activity",
      status: metrics.highAlerts > 0 ? "warning" : "positive",
    },

    {
      id: 4,
      label: "Resolved Alerts",
      value: metrics.resolvedAlerts,
      trend: "Successfully mitigated",
      status: "positive",
    },

    {
      id: 5,
      label: "Acknowledged",
      value: metrics.acknowledgedAlerts,
      trend: "Under investigation",
      status: metrics.acknowledgedAlerts > 0 ? "warning" : "positive",
    },

    {
      id: 6,
      label: "Alert Risk Score",
      value: alertRiskScore,
      trend: "Severity-weighted score (0–100)",
      status:
        alertRiskScore >= 50
          ? "critical"
          : alertRiskScore >= 20
            ? "warning"
            : "positive",
    },
  ];

  return (
    <section className="alert-overview-section">
      <header className="alert-overview-section__header">
        <h2 className="alert-overview-section__title">Alert Intelligence</h2>
      </header>

      <div className="alert-overview-grid">
        {alertData.map((item) => (
          <article
            key={item.id}
            className={`alert-overview-card alert-overview-card--${item.status}`}
          >
            <div className="alert-overview-card__header">
              <span className="alert-overview-card__label">{item.label}</span>

              <span className="alert-overview-card__indicator" />
            </div>

            <strong className="alert-overview-card__value">{item.value}</strong>

            <span className="alert-overview-card__trend">{item.trend}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AlertIntelligenceSection;
