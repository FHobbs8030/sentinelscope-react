import "./ScanOperationsSection.css";
import { launchMission } from "../../../services/orchestration/reconOrchestrator";
import { useState } from "react";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

import useScans from "../../../hooks/useScans";

import scanRuntimeEngine from "../../../services/runtime/scanRuntimeEngine";

const TERMINAL_SCAN_STATES = ["completed", "failed", "cancelled"];

function ScanOperationsSection() {
  const { scans, metrics, isLoading, error } = useScans();

  const [target, setTarget] = useState("");

  const [scanType, setScanType] = useState("full");

  const [profile, setProfile] = useState("General");
  const [severity, setSeverity] = useState("medium");

  const formatElapsedTime = (seconds = 0) => {
    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins}m ${secs}s`;
  };

  const formatStatusLabel = (status = "") => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

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

  if (isLoading) {
    return (
      <section className="scan-operations-section">
        <div className="scan-loading-state">
          Loading operational scan data...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="scan-operations-section">
        <div className="scan-error-state">{error}</div>
      </section>
    );
  }

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

                {!TERMINAL_SCAN_STATES.includes(scan.status) && (
                  <div className="scan-card-stage">
                    {scan.currentStage || "Queued"}
                  </div>
                )}

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
    </section>
  );
}

export default ScanOperationsSection;
