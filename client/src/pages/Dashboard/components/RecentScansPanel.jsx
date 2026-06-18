import "./ScanOperationsSection.css";

import useScans from "../../../hooks/useScans";
import scanRuntimeEngine from "../../../services/runtime/scanRuntimeEngine";

const TERMINAL_SCAN_STATES = ["completed", "failed", "cancelled"];

function RecentScansPanel() {
  const { scans, metrics, isLoading, error } = useScans();
  const formatElapsedTime = (seconds = 0) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}m ${secs}s`;
  };

  const formatStatusLabel = (status = "") => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (isLoading) {
    return (
      <div className="recent-scans-panel">
        <div className="scan-loading-state">Loading scan telemetry...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-scans-panel">
        <div className="scan-error-state">{error}</div>
      </div>
    );
  }

  return (
    <div className="recent-scans-panel">
      <div className="scan-panel-header">
        <div>
          <h2 className="scan-panel-title">Recent Scans</h2>

          <p className="scan-panel-subtitle">
            Live operational telemetry and runtime scan progression.
          </p>
        </div>

        <div className="scan-panel-metrics">
          <span className="scan-metric">
            Active: {metrics?.activeScans ?? 0}
          </span>

          <span className="scan-metric">
            Critical Findings: {metrics?.criticalFindings ?? 0}
          </span>
        </div>
      </div>
      <div className="recent-scans-list">
        {scans.map((scan) => {
          const isLive = !TERMINAL_SCAN_STATES.includes(scan.status);

          return (
            <div
              key={scan.mongoId ?? scan.id ?? scan.target}
              className="scan-card"
            >
              <div className="scan-card-header">
                <div className="scan-card-title-group">
                  <span className="scan-target">{scan.target}</span>

                  {scan.severity && (
                    <span
                      className={`scan-severity scan-severity--${scan.severity.toLowerCase()}`}
                    >
                      {scan.severity}
                    </span>
                  )}
                </div>

                <div className="scan-status-wrapper">
                  {isLive && <span className="scan-live-indicator" />}

                  <span className={`scan-status scan-status--${scan.status}`}>
                    {formatStatusLabel(scan.status)}
                  </span>
                </div>
              </div>

              <div className="scan-card-stage">
                {scan.currentStage || "Queued"}
              </div>

              <div className="scan-progress">
                <div className="scan-progress-track">
                  <div
                    className={`scan-progress-bar scan-progress-bar--${scan.status}`}
                    style={{
                      width: `${scan.progress ?? 0}%`,
                    }}
                  />
                </div>

                <span className="scan-progress-label">
                  {scan.progress ?? 0}%
                </span>
              </div>

              <div className="scan-card-metrics">
                <span>Runtime: {formatElapsedTime(scan.elapsedTime)}</span>

                <span>Findings: {scan.findingsCount ?? 0}</span>
              </div>

              {scan.status === "interrupted" && (
                <div className="scan-actions">
                  <button
                    className="scan-action-button"
                    type="button"
                    onClick={() =>
                      scanRuntimeEngine.resumeScan(scan.mongoId ?? scan.id)
                    }
                  >
                    Resume
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentScansPanel;
