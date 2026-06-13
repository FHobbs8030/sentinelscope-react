import "./ExecutiveIntelligenceSection.css";
import useAlerts from "../../../hooks/useAlerts";

function ExecutiveIntelligenceSection() {
  const { alerts } = useAlerts();
  const latestAlert = alerts.length > 0 ? alerts[0] : null;
  
  if (!latestAlert) {
    return (
      <section className="executive-intelligence-section">
        <h2 className="executive-intelligence-section__title">
          Executive Intelligence
        </h2>

        <div className="executive-intelligence-section__empty">
          No executive intelligence available.
        </div>
      </section>
    );
  }

  const executiveRisk = latestAlert.executiveRisk || {};
  const confidence = latestAlert.intelligenceConfidence || {};
  const threatActor = latestAlert.threatActor || {};
  const mitreAttack = latestAlert.mitreAttack || {};
  const businessImpact = latestAlert.businessImpact || {};

  return (
    <section className="executive-intelligence-section">
      <h2 className="executive-intelligence-section__title">
        Executive Intelligence
      </h2>

      <div className="executive-intelligence-grid">
        <div className="executive-intelligence-card">
          <span className="label">Executive Risk</span>
          <span className="value">{executiveRisk.level || "Unknown"}</span>
        </div>

        <div className="executive-intelligence-card">
          <span className="label">Business Priority</span>
          <span className="value">
            {executiveRisk.businessPriority || "N/A"}
          </span>
        </div>

        <div className="executive-intelligence-card">
          <span className="label">Urgency</span>
          <span className="value">{executiveRisk.urgency || "N/A"}</span>
        </div>

        <div className="executive-intelligence-card">
          <span className="label">Confidence</span>
          <span className="value">{confidence.score || 0}%</span>
        </div>

        <div className="executive-intelligence-card">
          <span className="label">Threat Actor</span>
          <span className="value">{threatActor.actor || "Unknown"}</span>
        </div>

        <div className="executive-intelligence-card">
          <span className="label">MITRE ATT&CK</span>
          <span className="value">{mitreAttack.techniqueId || "N/A"}</span>
        </div>

        <div className="executive-intelligence-card">
          <span className="label">Business Impact</span>
          <span className="value">
            {businessImpact.level || businessImpact.impactLevel || "Unknown"}
          </span>
        </div>
      </div>
    </section>
  );
}

export default ExecutiveIntelligenceSection;
