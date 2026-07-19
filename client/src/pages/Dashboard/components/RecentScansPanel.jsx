import { useState } from "react";

import "./ScanOperationsSection.css";

import useScans from "../../../hooks/useScans";

const MOBILE_SCAN_LIMIT = 10;

function RecentScansPanel() {
  const { scans, isLoading, error, refreshScans } = useScans();

  const [showAllMobileScans, setShowAllMobileScans] = useState(false);

  const mobileScans = showAllMobileScans
    ? scans
    : scans.slice(0, MOBILE_SCAN_LIMIT);

  const hasAdditionalMobileScans = scans.length > MOBILE_SCAN_LIMIT;

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
      return `${diffMinutes}m ago`;
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }

    const diffDays = Math.floor(diffHours / 24);

    return `${diffDays}d ago`;
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

      <div className="operations-table-container desktop-scans-table">
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
                <td
                  className="scan-table-cell target-cell"
                  data-label="Target"
                  title={scan.target}
                >
                  {scan.target}
                </td>

                <td className="scan-table-cell" data-label="Type">
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

                <td className="scan-table-cell" data-label="Status">
                  <span
                    className={`status-chip status-${(
                      scan.status || "completed"
                    ).toLowerCase()}`}
                  >
                    {formatStatusLabel(scan.status || "completed")}
                  </span>
                </td>

                <td className="scan-table-cell" data-label="Progress">
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

                <td className="scan-table-cell" data-label="Started">
                  {formatStartedTime(scan.startedAt)}
                </td>

                <td className="scan-table-cell" data-label="Actions">
                  <button type="button" className="scan-action-button">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile-scans-list">
        {mobileScans.map((scan, index) => {
          const scanType = scan.type || scan.scanType || "full";
          const scanStatus = scan.status || "completed";
          const scanProgress = scan.progress || 0;

          return (
            <article
              key={`mobile-${scan.scanId || scan._id || index}`}
              className="mobile-scan-card"
            >
              <div className="mobile-scan-target" title={scan.target}>
                {scan.target}
              </div>

              <div className="mobile-scan-meta">
                <div className="mobile-scan-field">
                  <span className="mobile-scan-label">Type</span>

                  <span
                    className={`scan-type-badge scan-type-${scanType.toLowerCase()}`}
                  >
                    {formatScanType(scanType)}
                  </span>
                </div>

                <div className="mobile-scan-field">
                  <span className="mobile-scan-label">Status</span>

                  <span
                    className={`status-chip status-${scanStatus.toLowerCase()}`}
                  >
                    {formatStatusLabel(scanStatus)}
                  </span>
                </div>

                <div className="mobile-scan-field mobile-scan-progress-field">
                  <span className="mobile-scan-label">Progress</span>

                  <div className="progress-wrapper">
                    <span className="progress-label">
                      {scanProgress}%
                    </span>

                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${scanProgress}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mobile-scan-field">
                  <span className="mobile-scan-label">Started</span>

                  <span className="mobile-scan-value">
                    {formatStartedTime(scan.startedAt)}
                  </span>
                </div>

                <div className="mobile-scan-field">
                  <span className="mobile-scan-label">Actions</span>

                  <button type="button" className="scan-action-button">
                    View
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {hasAdditionalMobileScans ? (
          <div className="mobile-scans-actions">
            <button
              type="button"
              className="mobile-scans-toggle"
              onClick={() => {
                setShowAllMobileScans((currentValue) => !currentValue);
              }}
            >
              {showAllMobileScans
                ? `Show Recent ${MOBILE_SCAN_LIMIT}`
                : `View All Scans (${scans.length})`}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default RecentScansPanel;
