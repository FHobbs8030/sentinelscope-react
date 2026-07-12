import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Flag,
  Network,
  Shield,
} from "lucide-react";

import "./ExecutiveIntelligenceSection.css";

import useAlerts from "../../../hooks/useAlerts";
import ExecutiveAssessmentPanel from "./ExecutiveAssessmentPanel";

const CRITICAL_TERMS = [
  "critical",
  "severe",
  "extreme",
  "high",
  "urgent",
  "immediate",
  "p1",
  "priority 1",
];

const WARNING_TERMS = [
  "elevated",
  "medium",
  "moderate",
  "guarded",
  "p2",
  "priority 2",
];

const POSITIVE_TERMS = [
  "low",
  "normal",
  "routine",
  "stable",
  "minimal",
  "p3",
  "p4",
  "priority 3",
  "priority 4",
];

function resolveSemanticTone(value) {
  const normalizedValue = String(value || "").trim().toLowerCase();

  if (!normalizedValue) {
    return "neutral";
  }

  if (CRITICAL_TERMS.some((term) => normalizedValue.includes(term))) {
    return "critical";
  }

  if (WARNING_TERMS.some((term) => normalizedValue.includes(term))) {
    return "warning";
  }

  if (POSITIVE_TERMS.some((term) => normalizedValue.includes(term))) {
    return "positive";
  }

  return "info";
}

function getDisplayValue(value, fallback = "Unknown") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return value;
}

function ExecutiveIntelligenceSection() {
  const { alerts = [] } = useAlerts();

  const latestAlert = alerts[0] || null;
  const hasIntelligence = Boolean(latestAlert);

  const executiveRisk = latestAlert?.executiveRisk || {};
  const confidence = latestAlert?.intelligenceConfidence || {};
  const threatActor = latestAlert?.threatActor || {};
  const mitreAttack = latestAlert?.mitreAttack || {};
  const businessImpact = latestAlert?.businessImpact || {};

  const parsedConfidenceScore = Number.parseFloat(confidence.score);
  const hasConfidenceScore = Number.isFinite(parsedConfidenceScore);
  const confidenceScore = hasConfidenceScore
    ? Math.min(100, Math.max(0, parsedConfidenceScore))
    : 0;

  const confidenceTone = !hasConfidenceScore
    ? "neutral"
    : confidenceScore >= 80
      ? "positive"
      : confidenceScore >= 60
        ? "info"
        : "warning";

  const riskLevel = getDisplayValue(executiveRisk.level);
  const businessPriority = getDisplayValue(
    executiveRisk.businessPriority,
    "N/A",
  );
  const urgency = getDisplayValue(executiveRisk.urgency, "N/A");
  const businessImpactLevel = getDisplayValue(
    businessImpact.level || businessImpact.impactLevel,
  );

  const intelligenceMetrics = [
    {
      id: "executive-risk",
      label: "Executive Risk",
      value: riskLevel,
      support: "Overall enterprise exposure posture",
      icon: Shield,
      tone: resolveSemanticTone(riskLevel),
      featured: true,
    },
    {
      id: "business-priority",
      label: "Business Priority",
      value: businessPriority,
      support: "Response sequencing",
      icon: Flag,
      tone: resolveSemanticTone(businessPriority),
    },
    {
      id: "urgency",
      label: "Urgency",
      value: urgency,
      support: "Required response speed",
      icon: Clock3,
      tone: resolveSemanticTone(urgency),
    },
    {
      id: "confidence",
      label: "Confidence",
      value: hasConfidenceScore ? `${Math.round(confidenceScore)}%` : "N/A",
      support: "Analytic confidence score",
      icon: CheckCircle2,
      tone: confidenceTone,
      meterValue: confidenceScore,
    },
    {
      id: "threat-actor",
      label: "Threat Actor",
      value: getDisplayValue(threatActor.actor),
      support: "Current attribution assessment",
      icon: Activity,
      tone: "info",
    },
    {
      id: "mitre-attack",
      label: "MITRE ATT&CK",
      value: getDisplayValue(mitreAttack.techniqueId, "N/A"),
      support: "Observed attack technique",
      icon: Network,
      tone: "info",
      monospace: true,
    },
    {
      id: "business-impact",
      label: "Business Impact",
      value: businessImpactLevel,
      support: "Expected operational consequence",
      icon: AlertTriangle,
      tone: resolveSemanticTone(businessImpactLevel),
    },
  ];

  return (
    <section
      className="executive-intelligence-section"
      aria-labelledby="executive-intelligence-title"
    >
      <header className="executive-intelligence-section__header">
        <div className="executive-intelligence-section__heading-group">
          <span className="executive-intelligence-section__eyebrow">
            Command Intelligence Layer
          </span>

          <div className="executive-intelligence-section__title-row">
            <div
              className="executive-intelligence-section__title-icon"
              aria-hidden="true"
            >
              <Activity size={19} strokeWidth={1.8} />
            </div>

            <div>
              <h2
                id="executive-intelligence-title"
                className="executive-intelligence-section__title"
              >
                Executive Intelligence
              </h2>
              <p className="executive-intelligence-section__subtitle">
                Decision-ready risk context translated from active security
                telemetry.
              </p>
            </div>
          </div>
        </div>

        <div
          className={`executive-intelligence-section__status executive-intelligence-section__status--${
            hasIntelligence ? "active" : "idle"
          }`}
        >
          <span className="executive-intelligence-section__status-dot" />
          {hasIntelligence ? "Intelligence active" : "Awaiting alert data"}
        </div>
      </header>

      {!hasIntelligence ? (
        <div
          className="executive-intelligence-section__empty"
          role="status"
          aria-live="polite"
        >
          <div
            className="executive-intelligence-section__empty-icon"
            aria-hidden="true"
          >
            <Shield size={25} strokeWidth={1.7} />
          </div>

          <div>
            <h3>No executive intelligence available</h3>
            <p>
              Executive assessments will appear after an alert produces
              business-risk and threat-context data.
            </p>
          </div>
        </div>
      ) : (
        <>
          <ExecutiveAssessmentPanel alert={latestAlert} />

          <div className="executive-intelligence-section__metrics-header">
            <div>
              <span className="executive-intelligence-section__metrics-kicker">
                Operational Decision Signals
              </span>
              <h3>Current intelligence posture</h3>
            </div>

            <span className="executive-intelligence-section__metrics-count">
              {intelligenceMetrics.length} indicators
            </span>
          </div>

          <div className="executive-intelligence-grid">
            {intelligenceMetrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <article
                  key={metric.id}
                  className={`executive-intelligence-card executive-intelligence-card--${
                    metric.tone
                  }${
                    metric.featured
                      ? " executive-intelligence-card--featured"
                      : ""
                  }`}
                >
                  <div className="executive-intelligence-card__top">
                    <span className="executive-intelligence-card__label">
                      {metric.label}
                    </span>

                    <div
                      className="executive-intelligence-card__icon"
                      aria-hidden="true"
                    >
                      <Icon size={16} strokeWidth={1.9} />
                    </div>
                  </div>

                  <strong
                    className={`executive-intelligence-card__value${
                      metric.monospace
                        ? " executive-intelligence-card__value--monospace"
                        : ""
                    }`}
                  >
                    {metric.value}
                  </strong>

                  <span className="executive-intelligence-card__support">
                    {metric.support}
                  </span>

                  {metric.meterValue !== undefined && (
                    <div
                      className="executive-intelligence-card__meter"
                      aria-hidden="true"
                    >
                      <span style={{ width: `${metric.meterValue}%` }} />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

export default ExecutiveIntelligenceSection;
