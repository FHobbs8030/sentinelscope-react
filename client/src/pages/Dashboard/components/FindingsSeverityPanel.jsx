import "./FindingsSeverityPanel.css";

import criticalMediumImage from "../../../assets/dashboard/severity-critical-medium.webp";
import highLowImage from "../../../assets/dashboard/severity-high-low.webp";

import useFindings from "../../../hooks/useFindings";

function FindingsSeverityPanel() {
  const { findings } = useFindings();

  const critical = findings.filter(
    (finding) => finding.severity === "critical",
  ).length;

  const high = findings.filter((finding) => finding.severity === "high").length;

  const medium = findings.filter(
    (finding) => finding.severity === "medium",
  ).length;

  const low = findings.filter((finding) => finding.severity === "low").length;

  return (
    <section className="workspace-card findings-severity-panel">
      <header className="workspace-card-header">
        <h3>Findings Severity</h3>
      </header>

      <div className="severity-layout">
        <div className="severity-group severity-group--critical">
          <div className="severity-group__metrics">
            <div className="severity-item critical">
              <span>Critical</span>
              <strong>{critical}</strong>
            </div>

            <div className="severity-item medium">
              <span>Medium</span>
              <strong>{medium}</strong>
            </div>
          </div>

          <div className="severity-visual" aria-hidden="true">
            <img src={criticalMediumImage} alt="" />
            <div className="severity-visual__overlay" />
          </div>
        </div>

        <div className="severity-group severity-group--high">
          <div className="severity-group__metrics">
            <div className="severity-item high">
              <span>High</span>
              <strong>{high}</strong>
            </div>

            <div className="severity-item low">
              <span>Low</span>
              <strong>{low}</strong>
            </div>
          </div>

          <div className="severity-visual" aria-hidden="true">
            <img src={highLowImage} alt="" />
            <div className="severity-visual__overlay" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FindingsSeverityPanel;
