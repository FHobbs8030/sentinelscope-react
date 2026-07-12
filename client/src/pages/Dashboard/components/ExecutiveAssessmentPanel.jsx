import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Flag,
  Shield,
} from "lucide-react";

import "./ExecutiveAssessmentPanel.css";

function ExecutiveAssessmentPanel({ alert }) {
  if (!alert) {
    return null;
  }

  const executiveRisk = alert.executiveRisk || {};
  const businessImpact = alert.businessImpact || {};
  const threatNarrative = alert.threatNarrative || {};
  const threatActor = alert.threatActor || {};
  const intelligenceConfidence = alert.intelligenceConfidence || {};

  const assessmentItems = [
    {
      id: "executive-summary",
      eyebrow: "Decision Brief",
      title: "Executive Summary",
      content:
        executiveRisk.summary ||
        "No executive risk summary is available for this alert.",
      icon: Shield,
      tone: "critical",
      wide: true,
    },
    {
      id: "threat-narrative",
      eyebrow: "Threat Context",
      title: "Threat Narrative",
      content:
        threatNarrative.summary ||
        "No threat narrative has been generated for this alert.",
      icon: Activity,
      tone: "info",
    },
    {
      id: "business-impact",
      eyebrow: "Enterprise Exposure",
      title: "Business Impact",
      content:
        businessImpact.summary ||
        "No business-impact assessment is available for this alert.",
      icon: AlertTriangle,
      tone: "warning",
    },
    {
      id: "threat-actor",
      eyebrow: "Attribution",
      title: "Threat Actor",
      content:
        threatActor.description ||
        "No threat-actor attribution is available for this alert.",
      icon: Flag,
      tone: "info",
    },
    {
      id: "confidence",
      eyebrow: "Analytic Quality",
      title: "Intelligence Confidence",
      content:
        intelligenceConfidence.rationale ||
        "No confidence rationale is available for this alert.",
      icon: FileText,
      tone: "neutral",
    },
    {
      id: "operator-guidance",
      eyebrow: "Recommended Action",
      title: "Operator Guidance",
      content:
        threatNarrative.operatorGuidance ||
        "No operator guidance has been generated for this alert.",
      icon: CheckCircle2,
      tone: "positive",
      wide: true,
    },
  ];

  return (
    <section
      className="executive-assessment-panel"
      aria-label="Executive intelligence assessment"
    >
      {assessmentItems.map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.id}
            className={`assessment-block assessment-block--${item.tone}${
              item.wide ? " assessment-block--wide" : ""
            }`}
          >
            <div className="assessment-block__header">
              <div className="assessment-block__icon" aria-hidden="true">
                <Icon size={17} strokeWidth={1.8} />
              </div>

              <div>
                <span className="assessment-block__eyebrow">
                  {item.eyebrow}
                </span>
                <h3 className="assessment-block__title">{item.title}</h3>
              </div>
            </div>

            <p className="assessment-block__content">{item.content}</p>
          </article>
        );
      })}
    </section>
  );
}

export default ExecutiveAssessmentPanel;
