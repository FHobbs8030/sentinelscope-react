import "./ExecutiveAssessmentPanel.css";

function ExecutiveAssessmentPanel({ alert }) {
  if (!alert) {
    return null;
  }

  return (
    <section className="executive-assessment-panel">
      <div className="assessment-block">
        <h3>Executive Summary</h3>
        <p>{alert.executiveRisk?.summary}</p>
      </div>

      <div className="assessment-block">
        <h3>Threat Narrative</h3>
        <p>{alert.threatNarrative?.summary}</p>
      </div>

      <div className="assessment-block">
        <h3>Business Impact</h3>
        <p>{alert.businessImpact?.summary}</p>
      </div>

      <div className="assessment-block">
        <h3>Threat Actor</h3>
        <p>{alert.threatActor?.description}</p>
      </div>

      <div className="assessment-block">
        <h3>Operator Guidance</h3>
        <p>{alert.threatNarrative?.operatorGuidance}</p>
      </div>

      <div className="assessment-block">
        <h3>Intelligence Confidence</h3>
        <p>{alert.intelligenceConfidence?.rationale}</p>
      </div>
    </section>
  );
}

export default ExecutiveAssessmentPanel;
