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
      return "Low-risk alert. Track for future review.";

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

    case "investigating":
      return "alert-badge alert-badge--investigating";

    case "resolved":
      return "alert-badge alert-badge--resolved";

    case "closed":
      return "alert-badge alert-badge--closed";

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
          <strong>{alert.target || "N/A"}</strong>
        </div>

        <div className="alert-intelligence-drawer__card">
          <span>Severity</span>

          <div className={getSeverityClass(alert.severity)}>
            {alert.severity || "N/A"}
          </div>
        </div>

        <div className="alert-intelligence-drawer__card">
          <span>Status</span>

          <div className={getStatusClass(alert.status)}>
            {alert.status || "N/A"}
          </div>
        </div>

        <div className="alert-intelligence-drawer__card">
          <span>Source</span>
          <strong>{alert.source || "N/A"}</strong>
        </div>

        <div className="alert-intelligence-drawer__card">
          <span>Individual Alert Risk Score</span>
          <strong>{alert.riskScore ?? "N/A"}</strong>
        </div>

        <div className="alert-intelligence-drawer__card">
          <span>Affected Asset</span>
          <strong>{alert.affectedAsset || "N/A"}</strong>
        </div>
      </div>

      <div className="alert-intelligence-drawer__insight">
        <h3>Risk Assessment</h3>

        <p>{getRiskAssessment(alert.severity)}</p>
      </div>

      <div className="alert-intelligence-drawer__insight">
        <h3>Evidence</h3>

        {alert.evidence?.length ? (
          <ul>
            {alert.evidence.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No evidence available.</p>
        )}
      </div>

      <div className="alert-intelligence-drawer__insight">
        <h3>Threat Context</h3>

        {alert.threatContext ? (
          <>
            <p>Category: {alert.threatContext.category || "N/A"}</p>

            <p>Confidence: {alert.threatContext.confidence || "N/A"}</p>

            <p>Stage: {alert.threatContext.stage || "N/A"}</p>
          </>
        ) : (
          <p>No threat context available.</p>
        )}
      </div>

      <div className="alert-intelligence-drawer__insight">
        <h3>Recommended Actions</h3>

        {alert.recommendedActions?.length ? (
          <ul>
            {alert.recommendedActions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>

      <div className="alert-intelligence-drawer__insight">
        <h3>Related Findings</h3>

        {alert.relatedFindings?.length ? (
          <ul>
            {alert.relatedFindings.map((findingId) => (
              <li key={findingId}>{findingId}</li>
            ))}
          </ul>
        ) : (
          <p>No related findings linked.</p>
        )}
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
