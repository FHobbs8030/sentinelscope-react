import "./AlertOperationsSection.css";

import useAlerts from "../../../hooks/useAlerts";

function AlertOperationsSection({ selectedAlert, onSelectAlert }) {
  const { alerts, acknowledge, investigate, resolve, close } = useAlerts();
 
  const activeAlerts = alerts
    .filter((alert) => alert.status !== "closed")
    .slice(0, 12);

  return (
    <section className="alert-operations-section">
      <header className="alert-operations-section__header">
        <h2 className="alert-operations-section__title">Alert Operations</h2>
      </header>

      <div className="alert-operations-list">
        {activeAlerts.map((alert) => {
          const isSelected = selectedAlert?._id === alert._id;

          return (
            <article
              key={alert._id}
              className={`alert-operations-card ${
                isSelected ? "alert-operations-card--selected" : ""
              }`}
              onClick={() => onSelectAlert(alert)}
            >
              <div className="alert-operations-card__content">
                <h3>{alert.title}</h3>

                <p>{alert.target}</p>

                <span>Status: {alert.status}</span>
              </div>

              <div
                className="alert-operations-card__actions"
                onClick={(event) => event.stopPropagation()}
              >
                {alert.status === "open" && (
                  <button onClick={() => acknowledge(alert._id)}>
                    Acknowledge
                  </button>
                )}

                {alert.status === "acknowledged" && (
                  <button onClick={() => investigate(alert._id)}>
                    Investigate
                  </button>
                )}

                {alert.status === "investigating" && (
                  <button onClick={() => resolve(alert._id)}>Resolve</button>
                )}

                {alert.status === "resolved" && (
                  <button onClick={() => close(alert._id)}>Close</button>
                )}
              </div>
            </article>
          );
        })}

        {activeAlerts.length === 0 && (
          <div className="alert-operations-empty">
            No active alerts detected.
          </div>
        )}
      </div>
    </section>
  );
}

export default AlertOperationsSection;
