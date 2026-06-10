import "./AlertTimelineViewer.css";

function formatDate(value) {
  if (!value) {
    return null;
  }

  try {
    return new Date(value).toLocaleString();
  } catch {
    return null;
  }
}

function AlertTimelineViewer({ alert }) {
  if (!alert) {
    return (
      <section className="alert-timeline-viewer">
        <h2 className="alert-timeline-viewer__title">Alert Timeline</h2>

        <div className="alert-timeline-viewer__empty">
          Select an alert to view timeline activity.
        </div>
      </section>
    );
  }

  const lifecycleEvents = [
    {
      label: "Created",
      timestamp: alert.createdAt,
    },
    {
      label: "Acknowledged",
      timestamp: alert.acknowledgedAt,
    },
    {
      label: "Investigating",
      timestamp: alert.investigatingAt,
    },
    {
      label: "Resolved",
      timestamp: alert.resolvedAt,
    },
    {
      label: "Closed",
      timestamp: alert.closedAt,
    },
  ].filter((event) => event.timestamp);

  const customEvents = (alert.timeline || []).filter((event) => {
    const action = event.action?.toLowerCase();

    return ![
      "created",
      "acknowledged",
      "investigating",
      "resolved",
      "closed",
    ].includes(action);
  });

  return (
    <section className="alert-timeline-viewer">
      <header className="alert-timeline-viewer__header">
        <h2 className="alert-timeline-viewer__title">Alert Timeline</h2>
      </header>

      <div className="alert-timeline-viewer__events">
        {lifecycleEvents.map((event, index) => (
          <div
            key={`${event.label}-${index}`}
            className="alert-timeline-viewer__event"
          >
            <div className="alert-timeline-viewer__dot" />

            <div className="alert-timeline-viewer__content">
              <strong>{event.label}</strong>

              <p>{formatDate(event.timestamp)}</p>
            </div>
          </div>
        ))}

        {customEvents.map((event, index) => (
          <div key={`custom-${index}`} className="alert-timeline-viewer__event">
            <div className="alert-timeline-viewer__dot alert-timeline-viewer__dot--secondary" />

            <div className="alert-timeline-viewer__content">
              <strong>{event.action || event.status || "Event"}</strong>

              <p>{formatDate(event.timestamp || event.createdAt)}</p>
            </div>
          </div>
        ))}

        {lifecycleEvents.length === 0 && customEvents.length === 0 && (
          <div className="alert-timeline-viewer__empty">
            No timeline events available.
          </div>
        )}
      </div>
    </section>
  );
}

export default AlertTimelineViewer;
