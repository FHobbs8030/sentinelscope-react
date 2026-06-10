import "./AlertDetailsPanel.css";

function getSeverityClass(severity) {
  switch (severity?.toLowerCase()) {
    case "critical":
      return "severity-badge severity-badge--critical";

    case "high":
      return "severity-badge severity-badge--high";

    case "medium":
      return "severity-badge severity-badge--medium";

    case "low":
      return "severity-badge severity-badge--low";

    default:
      return "severity-badge severity-badge--informational";
  }
}

function getStatusClass(status) {
  switch (status?.toLowerCase()) {
    case "open":
      return "status-badge status-badge--open";

    case "acknowledged":
      return "status-badge status-badge--acknowledged";

    case "investigating":
      return "status-badge status-badge--investigating";

    case "resolved":
      return "status-badge status-badge--resolved";

    case "closed":
      return "status-badge status-badge--closed";

    default:
      return "status-badge";
  }
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "N/A";
  }

  try {
    return new Date(dateValue).toLocaleString();
  } catch {
    return "N/A";
  }
}

function AlertDetailsPanel({ alert }) {
  if (!alert) {
    return (
      <section className="alert-details-panel">
        <h2 className="alert-details-panel__title">Alert Details</h2>

        <div className="alert-details-panel__empty">
          Select an alert to view investigation details.
        </div>
      </section>
    );
  }

  return (
    <section className="alert-details-panel">
      <header className="alert-details-panel__header">
        <h2 className="alert-details-panel__title">Alert Details</h2>

        <div className="alert-details-panel__summary">
          <h3 className="alert-details-panel__alert-title">{alert.title}</h3>

          <p className="alert-details-panel__target">{alert.target}</p>

          <div className="alert-details-panel__badges">
            <span className={getSeverityClass(alert.severity)}>
              {alert.severity}
            </span>

            <span className={getStatusClass(alert.status)}>{alert.status}</span>
          </div>
        </div>
      </header>

      <div className="alert-details-panel__grid">
        <div className="alert-details-panel__item">
          <span>Source</span>
          <strong>{alert.source || "N/A"}</strong>
        </div>

        <div className="alert-details-panel__item">
          <span>Target</span>
          <strong>{alert.target || "N/A"}</strong>
        </div>

        <div className="alert-details-panel__item">
          <span>Mission ID</span>
          <strong>{alert.missionId || "N/A"}</strong>
        </div>

        <div className="alert-details-panel__item">
          <span>Scan ID</span>
          <strong>{alert.scanId || "N/A"}</strong>
        </div>

        <div className="alert-details-panel__item">
          <span>Created</span>
          <strong>{formatDate(alert.createdAt)}</strong>
        </div>

        <div className="alert-details-panel__item">
          <span>Updated</span>
          <strong>{formatDate(alert.updatedAt)}</strong>
        </div>
      </div>
    </section>
  );
}

export default AlertDetailsPanel;
