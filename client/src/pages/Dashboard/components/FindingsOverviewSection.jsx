import "./FindingsOverviewSection.css";

import useFindings from "../../../hooks/useFindings";

function FindingsOverviewSection() {
  const { findings, severityMetrics, riskScore } = useFindings();

  const findingsData = [
    {
      id: 1,
      label: "Total Findings",
      value: findings.length,
      trend: "Persisted in MongoDB",
      status: findings.length > 0 ? "warning" : "positive",
    },

    {
      id: 2,
      label: "Critical Findings",
      value: severityMetrics.critical,
      trend: "Immediate remediation required",
      status: severityMetrics.critical > 0 ? "critical" : "positive",
    },

    {
      id: 3,
      label: "High Severity",
      value: severityMetrics.high,
      trend: "Elevated operational risk",
      status: severityMetrics.high > 0 ? "warning" : "positive",
    },

    {
      id: 4,
      label: "Medium Severity",
      value: severityMetrics.medium,
      trend: "Monitor and prioritize",
      status: "warning",
    },

    {
      id: 5,
      label: "Low Severity",
      value: severityMetrics.low,
      trend: "Low operational impact",
      status: "positive",
    },

    {
      id: 6,
      label: "Risk Score",
      value: riskScore,
      trend: "Calculated threat exposure",
      status:
        riskScore > 50 ? "critical" : riskScore > 20 ? "warning" : "positive",
    },
  ];

  return (
    <section className="findings-overview-section">
      <header className="findings-overview-section__header">
        <h2 className="findings-overview-section__title">
          Findings Intelligence
        </h2>
      </header>

      <div className="findings-overview-grid">
        {findingsData.map((item) => (
          <article
            key={item.id}
            className={`findings-overview-card findings-overview-card--${item.status}`}
          >
            <div className="findings-overview-card__header">
              <span className="findings-overview-card__label">
                {item.label}
              </span>

              <span className="findings-overview-card__indicator" />
            </div>

            <strong className="findings-overview-card__value">
              {item.value}
            </strong>

            <span className="findings-overview-card__trend">{item.trend}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FindingsOverviewSection;
