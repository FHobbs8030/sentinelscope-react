import "./CorrelationIntelligenceSection.css";

import useAlerts from "../../../hooks/useAlerts";

function CorrelationIntelligenceSection() {
  const { campaignAssessment } = useAlerts();

  if (!campaignAssessment) {
    return null;
  }

  return (
    <section className="correlation-section">
      <header className="correlation-section__header">
        <h2>Correlation Intelligence</h2>
      </header>

      <div className="correlation-grid">
        <article
          className={`correlation-card correlation-card--${campaignAssessment.riskLevel.toLowerCase()}`}
        >
          <span>Campaign</span>
          <strong>{campaignAssessment.name}</strong>
        </article>

        <article className="correlation-card">
          <span>Target</span>
          <strong>{campaignAssessment.target}</strong>
        </article>

        <article
          className={`correlation-card correlation-card--${campaignAssessment.riskLevel.toLowerCase()}`}
        >
          <span>Risk Level</span>
          <strong>{campaignAssessment.riskLevel}</strong>
        </article>

        <article className="correlation-card">
          <span>Confidence</span>

          <div className="correlation-confidence">
            {campaignAssessment.confidence.level} (
            {campaignAssessment.confidence.score})
          </div>
        </article>

        <article className="correlation-card">
          <span>Related Alerts</span>
          <strong>{campaignAssessment.relatedAlerts}</strong>
        </article>

        <article className="correlation-card">
          <span>Threat Actors</span>

          <div className="correlation-pill-group">
            {campaignAssessment.threatActors.map((actor) => (
              <span key={actor} className="correlation-pill">
                {actor}
              </span>
            ))}
          </div>
        </article>

        <article className="correlation-card">
          <span>Attack Progression</span>

          <div className="correlation-chain">
            {campaignAssessment.stagesObserved.map((stage) => (
              <span key={stage} className="correlation-stage">
                {stage.toUpperCase()}
              </span>
            ))}
          </div>
        </article>

        <article className="correlation-card">
          <span>MITRE ATT&CK</span>

          <div className="correlation-pill-group">
            {campaignAssessment.mitreTechniques.map((technique) => (
              <span key={technique} className="correlation-mitre-pill">
                {technique}
              </span>
            ))}
          </div>
        </article>
      </div>

      <div className="correlation-summary-card">
        <h3>Campaign Assessment</h3>

        <p>{campaignAssessment.summary}</p>
      </div>
    </section>
  );
}

export default CorrelationIntelligenceSection;
