import "./ScanOperationsSection.css";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import useScans from "../../../hooks/useScans";

function ScanOperationsSection() {
  const { scans, metrics, isLoading, error } = useScans();

  console.log(scans);
  console.log(metrics);
  console.log(isLoading);
  console.log(error);

  return (
    <section className="scan-operations-section">
      <div className="scan-launch-panel">
        <div className="scan-panel-header">
          <div>
            <h2 className="scan-panel-title">Start New Scan</h2>

            <p className="scan-panel-subtitle">
              Configure a target and launch an operational scan.
            </p>
          </div>

          <span className="scan-panel-badge">Ready</span>
        </div>

        <div className="scan-form-grid">
          <Input
            label="Target"
            placeholder="example.com or 192.168.1.1"
            helperText="Enter an IP address, hostname, or domain."
          />

          <label className="scan-field">
            <span className="scan-field-label">Scan Type</span>

            <select className="scan-select" defaultValue="Full Scan">
              <option>Full Scan</option>
              <option>Port Scan</option>
              <option>Web Scan</option>
              <option>Vulnerability Scan</option>
            </select>
          </label>

          <label className="scan-field">
            <span className="scan-field-label">Profile</span>

            <select className="scan-select" defaultValue="General">
              <option>General</option>
              <option>Quick</option>
              <option>Comprehensive</option>
              <option>Critical</option>
            </select>
          </label>
        </div>

        <div className="scan-panel-actions">
          <Button>Start Scan</Button>

          <button className="scan-secondary-action" type="button">
            Import Targets
          </button>
        </div>
      </div>

      <div className="recent-scans-panel">
        <div className="scan-panel-header">
          <div>
            <h2 className="scan-panel-title">Recent Scans</h2>

            <p className="scan-panel-subtitle">
              Track scan status, progress, and target activity.
            </p>
          </div>

          <button className="scan-link-action" type="button">
            View all
          </button>
        </div>

        <div className="recent-scans-table-wrap">
          <table className="recent-scans-table">
            <thead>
              <tr>
                <th>Target</th>
                <th>Type</th>
                <th>Profile</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Started</th>
              </tr>
            </thead>

            <tbody>
              {scans.map((scan) => (
                <tr key={scan.id}>
                  <td>{scan.target}</td>

                  <td>{scan.type}</td>

                  <td>{scan.profile}</td>

                  <td>
                    <span
                      className={`scan-status scan-status--${scan.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {scan.status}
                    </span>
                  </td>

                  <td>
                    <div className="scan-progress">
                      <span
                        className="scan-progress-bar"
                        style={{ width: `${scan.progress}%` }}
                      />

                      <span className="scan-progress-label">
                        {scan.progress}%
                      </span>
                    </div>
                  </td>

                  <td>{scan.duration || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ScanOperationsSection;
