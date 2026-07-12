import { useMemo } from "react";

import useFindings from "../../hooks/useFindings";

import "./TargetRiskPanel.css";

function TargetRiskPanel() {
  const { findings = [] } = useFindings();

  const summary = useMemo(() => {
    return findings.reduce(
      (accumulator, finding) => {
        const severity = finding.severity?.toLowerCase();

        if (severity === "critical") {
          accumulator.critical += 1;
        }

        if (severity === "high") {
          accumulator.high += 1;
        }

        if (severity === "medium") {
          accumulator.medium += 1;
        }

        if (severity === "low") {
          accumulator.low += 1;
        }

        return accumulator;
      },
      {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
      },
    );
  }, [findings]);

  return (
    <section className="dashboard-card target-risk-panel">
      <div className="panel-header">
        <h3>Risk Overview</h3>
      </div>

      <div className="risk-grid">
        <div className="risk-card critical">
          <span>Critical</span>
          <strong>{summary.critical}</strong>
        </div>

        <div className="risk-card high">
          <span>High</span>
          <strong>{summary.high}</strong>
        </div>

        <div className="risk-card medium">
          <span>Medium</span>
          <strong>{summary.medium}</strong>
        </div>

        <div className="risk-card low">
          <span>Low</span>
          <strong>{summary.low}</strong>
        </div>
      </div>
    </section>
  );
}

export default TargetRiskPanel;
