import "./TargetDetailsPanel.css";

function TargetDetailsPanel() {
  return (
    <section className="dashboard-card target-details-panel">
      <div className="panel-header">
        <h3>Target Details</h3>
      </div>

      <div className="target-details-content">
        <div className="detail-row">
          <span className="detail-label">Selected Target</span>
          <span className="detail-value">No Target Selected</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Mission Count</span>
          <span className="detail-value">0</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Scan Count</span>
          <span className="detail-value">0</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Status</span>
          <span className="detail-value status-neutral">
            Waiting For Selection
          </span>
        </div>
      </div>
    </section>
  );
}

export default TargetDetailsPanel;
