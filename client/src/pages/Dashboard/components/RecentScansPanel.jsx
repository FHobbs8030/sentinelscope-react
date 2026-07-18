import "./ScanOperationsSection.css";

import useScans from "../../../hooks/useScans";

function RecentScansPanel() {
  const { scans, isLoading, error, refreshScans } = useScans();

  const formatStatusLabel = (status = "") => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatScanType = (type = "") => {
    switch (type.toLowerCase()) {
      case "full":
        return "Full Recon";

      case "recon":
        return "Recon Scan";

      case "enumeration":
        return "Enumeration Scan";

      case "vulnerability":
        return "Vulnerability Scan";

      default:
        return type;
    }
  };

  const formatStartedTime = (startedAt) => {
    if (!startedAt) {
      return "Just now";
    }

    const started = new Date(startedAt);
    const now = new Date();

    const diffMinutes = Math.floor((now.getTime() - started.getTime()) / 60000);

    if (diffMinutes < 1) {
      return "Just now";
    }

    if (diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) {
      return `${diffHours} hour ago`;
    }

    const diffDays = Math.floor(diffHours / 24);

    return `${diffDays} day ago`;
  };

  const retryLoad = () => {
    void refreshScans();
  };

  if (isLoading && scans.length === 0) {
    return (
      <div className="recent-scans-panel">
        <div className="scan-loading-state" role="status" aria-live="polite">
          Loading scan telemetry...
        </div>
      </div>
    );
  }

  if (error && scans.length === 0) {
    return (
      <div className="recent-scans-panel">
        <div className="scan-error-state" role="alert" aria-live="assertive">
          <span>{error}</span>

          <button
            type="button"
            className="scan-action-button"
            onClick={retryLoad}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-scans-panel">
      {error ? (
        <div className="scan-error-state" role="alert" aria-live="polite">
          <span>{error} Showing the last available scan telemetry.</span>

          <button
            type="button"
            className="scan-action-button"
            onClick={retryLoad}
          >
            Retry
          </button>
        </div>
      ) : null}

      <div className="operations-table-container">
        <table className="recent-scans-table">
          <thead>
            <tr className="scan-table-header">
              <th>Target</th>
              <th>Type</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Started</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {scans.map((scan, index) => (
              <tr
                key={scan.scanId || scan._id || index}
                className="scan-table-row"
              >
                <td className="scan-table-cell target-cell">{scan.target}</td>

                <td className="scan-table-cell">
                  <span
                    className={`scan-type-badge scan-type-${(
                      scan.type ||
                      scan.scanType ||
                      "full"
                    ).toLowerCase()}`}
                  >
                    {formatScanType(scan.type || scan.scanType || "full")}
                  </span>
                </td>

                <td className="scan-table-cell">
                  <span
                    className={`status-chip status-${(
                      scan.status || "completed"
                    ).toLowerCase()}`}
                  >
                    {formatStatusLabel(scan.status || "completed")}
                  </span>
                </td>

                <td className="scan-table-cell">
                  <div className="progress-wrapper">
                    <span className="progress-label">
                      {scan.progress || 0}%
                    </span>

                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${scan.progress || 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                <td className="scan-table-cell">
                  {formatStartedTime(scan.startedAt)}
                </td>

                <td className="scan-table-cell">
                  <button type="button" className="scan-action-button">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentScansPanel;
