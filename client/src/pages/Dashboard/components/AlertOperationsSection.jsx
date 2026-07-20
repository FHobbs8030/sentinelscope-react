import "./AlertOperationsSection.css";

import useAlerts from "../../../hooks/useAlerts";

const getAlertId = (alert) => {
  return alert?._id || alert?.id || null;
};

const formatStatusLabel = (status = "") => {
  return status
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getSeverityClass = (severity = "") => {
  const normalizedSeverity = severity.toLowerCase();

  return [
    "alert-operations-severity",
    normalizedSeverity
      ? `alert-operations-severity--${normalizedSeverity}`
      : "",
  ]
    .filter(Boolean)
    .join(" ");
};

const getCardSeverityClass = (severity = "") => {
  const normalizedSeverity = severity.toLowerCase();

  return normalizedSeverity
    ? `alert-operations-card--${normalizedSeverity}`
    : "";
};

const getRiskScore = (alert) => {
  const numericRiskScore = Number(alert?.riskScore);

  if (!Number.isFinite(numericRiskScore)) {
    return null;
  }

  return Math.min(100, Math.max(0, Math.round(numericRiskScore)));
};

const getShortId = (alert) => {
  const alertId = getAlertId(alert);

  if (!alertId) {
    return "Unavailable";
  }

  const normalizedId = String(alertId);

  if (normalizedId.length <= 12) {
    return normalizedId;
  }

  return `…${normalizedId.slice(-8)}`;
};

function AlertOperationsSection({ selectedAlert, onSelectAlert }) {
  const {
    alerts,
    loading,
    hasLoaded,
    isUpdating,
    error,
    refreshAlerts,
    acknowledge,
    investigate,
    resolve,
    close,
  } = useAlerts();

  const allActiveAlerts = alerts.filter((alert) => alert.status !== "closed");

  const visibleAlerts = allActiveAlerts.slice(0, 12);

  const retryLoad = () => {
    void refreshAlerts();
  };

  const selectAlert = (alert) => {
    onSelectAlert(alert);
  };

  const handleCardKeyDown = (event, alert) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectAlert(alert);
    }
  };

  const runWorkflowAction = (alert) => {
    const alertId = getAlertId(alert);

    if (!alertId) {
      return;
    }

    switch (alert.status) {
      case "open":
        void acknowledge(alertId);
        break;

      case "acknowledged":
        void investigate(alertId);
        break;

      case "investigating":
        void resolve(alertId);
        break;

      case "resolved":
        void close(alertId);
        break;

      default:
        break;
    }
  };

  const getWorkflowActionLabel = (status) => {
    switch (status) {
      case "open":
        return "Acknowledge";

      case "acknowledged":
        return "Investigate";

      case "investigating":
        return "Resolve";

      case "resolved":
        return "Close";

      default:
        return null;
    }
  };

  if (loading && !hasLoaded) {
    return (
      <section className="alert-operations-section">
        <header className="alert-operations-section__header">
          <div>
            <span className="alert-operations-section__eyebrow">
              Threat Response Queue
            </span>

            <h2 className="alert-operations-section__title">
              Alert Operations
            </h2>
          </div>
        </header>

        <div
          className="alert-operations-state"
          role="status"
          aria-live="polite"
        >
          Loading alert operations...
        </div>
      </section>
    );
  }

  if (error && !hasLoaded) {
    return (
      <section className="alert-operations-section">
        <header className="alert-operations-section__header">
          <div>
            <span className="alert-operations-section__eyebrow">
              Threat Response Queue
            </span>

            <h2 className="alert-operations-section__title">
              Alert Operations
            </h2>
          </div>
        </header>

        <div
          className="alert-operations-state alert-operations-state--error"
          role="alert"
          aria-live="assertive"
        >
          <span>{error}</span>

          <button
            type="button"
            className="alert-operations-state__button"
            onClick={retryLoad}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="alert-operations-section">
      <header className="alert-operations-section__header">
        <div>
          <span className="alert-operations-section__eyebrow">
            Threat Response Queue
          </span>

          <h2 className="alert-operations-section__title">Alert Operations</h2>

          <p className="alert-operations-section__subtitle">
            Prioritized security events requiring analyst review and response.
          </p>
        </div>

        <div className="alert-operations-section__summary">
          <span
            className="alert-operations-section__pulse"
            aria-hidden="true"
          />

          <span className="alert-operations-section__count">
            <strong>{allActiveAlerts.length}</strong>
            <span>Active</span>
          </span>
        </div>
      </header>

      {error ? (
        <div
          className="alert-operations-state alert-operations-state--error"
          role="alert"
          aria-live="polite"
        >
          <span>{error} Showing the last available alert data.</span>

          <button
            type="button"
            className="alert-operations-state__button"
            onClick={retryLoad}
            disabled={loading || isUpdating}
          >
            Retry
          </button>
        </div>
      ) : null}

      {loading && hasLoaded ? (
        <div
          className="alert-operations-state"
          role="status"
          aria-live="polite"
        >
          Refreshing alert operations...
        </div>
      ) : null}

      <div className="alert-operations-list">
        {visibleAlerts.map((alert) => {
          const alertId = getAlertId(alert);
          const selectedAlertId = getAlertId(selectedAlert);

          const isSelected =
            alertId &&
            selectedAlertId &&
            String(alertId) === String(selectedAlertId);

          const riskScore = getRiskScore(alert);
          const workflowActionLabel = getWorkflowActionLabel(alert.status);
          const relatedFindingsCount = alert.relatedFindings?.length ?? 0;

          return (
            <article
              key={alertId || `${alert.target}-${alert.title}`}
              className={[
                "alert-operations-card",
                getCardSeverityClass(alert.severity),
                isSelected ? "alert-operations-card--selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              role="button"
              tabIndex={0}
              aria-pressed={Boolean(isSelected)}
              onClick={() => selectAlert(alert)}
              onKeyDown={(event) => {
                handleCardKeyDown(event, alert);
              }}
            >
              <div className="alert-operations-card__accent" />

              <div className="alert-operations-card__header">
                <div className="alert-operations-card__badges">
                  <span className={getSeverityClass(alert.severity)}>
                    <span
                      className="alert-operations-severity__dot"
                      aria-hidden="true"
                    />

                    {alert.severity || "Unknown"}
                  </span>

                  <span
                    className={`alert-operations-status alert-operations-status--${
                      alert.status || "unknown"
                    }`}
                  >
                    {formatStatusLabel(alert.status || "unknown")}
                  </span>
                </div>

                <span
                  className="alert-operations-card__id"
                  title={alertId ? String(alertId) : "Alert ID unavailable"}
                >
                  ID {getShortId(alert)}
                </span>
              </div>

              <div className="alert-operations-card__content">
                <div className="alert-operations-card__title-group">
                  <span className="alert-operations-card__classification">
                    Security Alert
                  </span>

                  <h3>{alert.title || "Security Alert"}</h3>

                  <div className="alert-operations-card__target">
                    <span>Target</span>
                    <strong>{alert.target || "Unknown target"}</strong>
                  </div>
                </div>

                <div className="alert-operations-card__intel-grid">
                  <div className="alert-operations-card__intel">
                    <span>Risk Score</span>

                    <strong>
                      {riskScore !== null ? riskScore : "N/A"}
                      {riskScore !== null ? <small>/100</small> : null}
                    </strong>
                  </div>

                  <div className="alert-operations-card__intel">
                    <span>Source</span>
                    <strong>{alert.source || "Unknown"}</strong>
                  </div>

                  <div className="alert-operations-card__intel">
                    <span>Findings</span>
                    <strong>{relatedFindingsCount}</strong>
                  </div>
                </div>

                <div className="alert-operations-card__risk">
                  <div className="alert-operations-card__risk-header">
                    <span>Threat Risk</span>

                    <span>
                      {riskScore !== null ? `${riskScore}%` : "Unavailable"}
                    </span>
                  </div>

                  <div className="alert-operations-card__risk-track">
                    <div
                      className="alert-operations-card__risk-fill"
                      style={{
                        width: `${riskScore ?? 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <footer className="alert-operations-card__footer">
                <span className="alert-operations-card__view">
                  View intelligence
                  <span aria-hidden="true">→</span>
                </span>

                {workflowActionLabel ? (
                  <div
                    className="alert-operations-card__actions"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    onKeyDown={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => {
                        runWorkflowAction(alert);
                      }}
                    >
                      {workflowActionLabel}
                    </button>
                  </div>
                ) : null}
              </footer>
            </article>
          );
        })}

        {hasLoaded && allActiveAlerts.length === 0 ? (
          <div className="alert-operations-empty">
            <span className="alert-operations-empty__icon" aria-hidden="true">
              ✓
            </span>

            <strong>No active alerts detected</strong>

            <p>The analyst queue is currently clear.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default AlertOperationsSection;
