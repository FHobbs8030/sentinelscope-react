import "./AlertIntelligenceDrawer.css";

function getRiskAssessment(severity) {
  switch (severity?.toLowerCase()) {
    case "critical":
      return "Immediate investigation required. Potential high-impact exposure detected.";

    case "high":
      return "Elevated risk identified. Review findings and validate exposure.";

    case "medium":
      return "Moderate operational risk. Monitor and investigate as needed.";

    case "low":
      return "Low-risk finding. Track for future review.";

    default:
      return "No risk assessment available.";
  }
}

function getSeverityClass(severity) {
  switch (severity?.toLowerCase()) {
    case "critical":
      return "alert-badge alert-badge--critical";

    case "high":
      return "alert-badge alert-badge--high";

    case "medium":
      return "alert-badge alert-badge--medium";

    case "low":
      return "alert-badge alert-badge--low";

    default:
      return "alert-badge";
  }
}

function getStatusClass(status) {
  switch (status?.toLowerCase()) {
    case "open":
      return "alert-badge alert-badge--open";

    case "acknowledged":
      return "alert-badge alert-badge--acknowledged";

    case "resolved":
      return "alert-badge alert-badge--resolved";

    default:
      return "alert-badge";
  }
}

function AlertIntelligenceDrawer({ alert }) {
  if (!alert) {
    return (
      <section className="alert-intelligence-drawer">
        <h2 className="alert-intelligence-drawer__title">Alert Intelligence</h2>

        <div className="alert-intelligence-drawer__empty">
          Select an alert to view intelligence context.
        </div>
      </section>
    );
  }

  return (
    <section className="alert-intelligence-drawer">
      <header className="alert-intelligence-drawer__header">
        <h2 className="alert-intelligence-drawer__title">Alert Intelligence</h2>
      </header>

      <div className="alert-intelligence-drawer__grid">
        <div className="alert-intelligence-drawer__card">
          <span>Target</span>
          <strong>{alert.target}</strong>
        </div>

        <div className="alert-intelligence-drawer__card">
          <span>Severity</span>

          <div className={getSeverityClass(alert.severity)}>
            {alert.severity}
          </div>
        </div>

        <div className="alert-intelligence-drawer__card">
          <span>Status</span>

          <div className={getStatusClass(alert.status)}>{alert.status}</div>
        </div>

        <div className="alert-intelligence-drawer__card">
          <span>Source</span>
          <strong>{alert.source || "N/A"}</strong>
        </div>
      </div>

      <div className="alert-intelligence-drawer__insight">
        <h3>Risk Assessment</h3>

        <p>{getRiskAssessment(alert.severity)}</p>
      </div>

      <div className="alert-intelligence-drawer__actions">
        <button className="alert-action-button primary">Acknowledge</button>

        <button className="alert-action-button">Assign Analyst</button>

        <button className="alert-action-button">Create Incident</button>

        <button className="alert-action-button">Export Report</button>
      </div>
    </section>
  );
}

export default AlertIntelligenceDrawer;
