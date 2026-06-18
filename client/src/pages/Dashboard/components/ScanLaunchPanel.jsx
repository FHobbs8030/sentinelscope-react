import { useState } from "react";

import "./ScanOperationsSection.css";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

import { launchMission } from "../../../services/orchestration/reconOrchestrator";

function ScanLaunchPanel() {
  const [target, setTarget] = useState("");
  const [scanType, setScanType] = useState("full");
  const [profile, setProfile] = useState("General");
  const [severity, setSeverity] = useState("medium");

  const handleStartScan = () => {
    if (!target.trim()) {
      return;
    }

    launchMission({
      target,
      type: scanType,
      profile,
      severity,
    });

    setTarget("");
  };

  return (
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
          value={target}
          onChange={(event) => setTarget(event.target.value)}
          placeholder="example.com or 192.168.1.1"
          helperText="Enter an IP address, hostname, or domain."
        />

        <label className="scan-field">
          <span className="scan-field-label">Scan Type</span>

          <select
            className="scan-select"
            value={scanType}
            onChange={(event) => setScanType(event.target.value)}
          >
            <option value="full">Full Scan</option>
            <option value="recon">Recon Scan</option>
            <option value="enumeration">Enumeration Scan</option>
            <option value="vulnerability">Vulnerability Scan</option>
          </select>
        </label>

        <label className="scan-field">
          <span className="scan-field-label">Profile</span>

          <select
            className="scan-select"
            value={profile}
            onChange={(event) => setProfile(event.target.value)}
          >
            <option>General</option>
            <option>Quick</option>
            <option>Comprehensive</option>
            <option>Critical</option>
          </select>
        </label>

        <label className="scan-field">
          <span className="scan-field-label">Severity</span>

          <select
            className="scan-select"
            value={severity}
            onChange={(event) => setSeverity(event.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </label>
      </div>

      <div className="scan-panel-actions">
        <Button onClick={handleStartScan}>Start Scan</Button>

        <button className="scan-secondary-action" type="button">
          Import Targets
        </button>
      </div>
    </div>
  );
}

export default ScanLaunchPanel;
