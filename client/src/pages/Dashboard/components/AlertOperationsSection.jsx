import "./AlertOperationsSection.css";

import useAlerts from "../../../hooks/useAlerts";

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

  if (loading && !hasLoaded) {
    return (
      <section className="alert-operations-section">
        <header className="alert-operations-section__header">
          <h2 className="alert-operations-section__title">Alert Operations</h2>
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
          <h2 className="alert-operations-section__title">Alert Operations</h2>
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
        <h2 className="alert-operations-section__title">Alert Operations</h2>

        <span className="alert-operations-section__count">
          {allActiveAlerts.length} active
        </span>
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
          const isSelected = selectedAlert?._id === alert._id;

          return (
            <article
              key={alert._id}
              className={`alert-operations-card ${
                isSelected ? "alert-operations-card--selected" : ""
              }`}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => selectAlert(alert)}
              onKeyDown={(event) => {
                handleCardKeyDown(event, alert);
              }}
            >
              <div className="alert-operations-card__content">
                <h3>{alert.title}</h3>

                <p>{alert.target}</p>

                <span>Status: {alert.status}</span>
              </div>

              <div
                className="alert-operations-card__actions"
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onKeyDown={(event) => {
                  event.stopPropagation();
                }}
              >
                {alert.status === "open" ? (
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => {
                      void acknowledge(alert._id);
                    }}
                  >
                    Acknowledge
                  </button>
                ) : null}

                {alert.status === "acknowledged" ? (
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => {
                      void investigate(alert._id);
                    }}
                  >
                    Investigate
                  </button>
                ) : null}

                {alert.status === "investigating" ? (
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => {
                      void resolve(alert._id);
                    }}
                  >
                    Resolve
                  </button>
                ) : null}

                {alert.status === "resolved" ? (
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => {
                      void close(alert._id);
                    }}
                  >
                    Close
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}

        {hasLoaded && allActiveAlerts.length === 0 ? (
          <div className="alert-operations-empty">
            No active alerts detected.
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default AlertOperationsSection;
