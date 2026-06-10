import "./AlertTimeline.css";

export default function AlertTimeline() {
  return (
    <section className="alert-timeline">
      <h2>Alert Timeline</h2>

      <div className="timeline-list">
        <div className="timeline-item">
          <div className="timeline-dot timeline-success" />

          <div className="timeline-content">
            <h3>Alert Created</h3>

            <p>
              Security finding discovered and persisted to the SentinelScope
              intelligence database.
            </p>

            <span>6/9/2026 1:24:30 AM</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot timeline-warning" />

          <div className="timeline-content">
            <h3>Critical Alert Triggered</h3>

            <p>
              Alert generated automatically by the findings intelligence engine.
            </p>

            <span>6/9/2026 1:24:30 AM</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot timeline-danger" />

          <div className="timeline-content">
            <h3>Awaiting Analyst Review</h3>

            <p>
              Alert remains open and requires investigation by a security
              analyst.
            </p>

            <span>Current Status</span>
          </div>
        </div>
      </div>
    </section>
  );
}
