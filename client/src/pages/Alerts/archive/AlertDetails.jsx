import "./AlertDetails.css";

import AlertTimeline from "../AlertTimeline";
import AlertIntelligenceCard from "./AlertIntelligenceCard";

export default function AlertDetails() {
  return (
    <div className="alert-details-page">
      <section className="alert-threat-banner">
        <span className="alert-threat-label">Critical Security Finding</span>

        <h1>Walmart.com</h1>

        <div className="alert-threat-meta">
          <span className="alert-status-badge critical">Critical</span>

          <span className="alert-status-badge open">Open</span>
        </div>
      </section>

      <section className="alert-section">
        <h2>Alert Intelligence</h2>

        <div className="alert-intelligence-grid">
          <AlertIntelligenceCard title="Target" value="Walmart.com" />

          <AlertIntelligenceCard title="Severity" value="critical" />

          <AlertIntelligenceCard title="Status" value="open" />

          <AlertIntelligenceCard title="Source" value="finding-engine" />
        </div>
      </section>

      <AlertTimeline />

      <section className="alert-section">
        <h2>Risk Assessment</h2>

        <p>
          Immediate investigation required. Potential high-impact exposure
          detected.
        </p>
      </section>

      <section className="alert-section">
        <h2>Recommended Actions</h2>

        <div className="alert-actions">
          <button className="alert-action-button primary">Acknowledge</button>

          <button className="alert-action-button">Assign Analyst</button>

          <button className="alert-action-button">Create Incident</button>

          <button className="alert-action-button">Export Report</button>
        </div>
      </section>
    </div>
  );
}
