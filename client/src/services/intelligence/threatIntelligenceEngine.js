import { THREAT_CONTEXT_TEMPLATES } from "./threatContextTemplates";

export function generateThreatIntelligence({ stage, severity, source }) {
  const template =
    THREAT_CONTEXT_TEMPLATES[stage] ?? THREAT_CONTEXT_TEMPLATES.failure;

  let confidence = template.confidence;

  if (severity === "critical") {
    confidence = "High";
  }

  if (severity === "low") {
    confidence = "Low";
  }

  return {
    threatContext: {
      category: template.category,
      attackStage: template.attackStage,
      impact: template.impact,
      confidence,
      source,
    },

    recommendedActions: template.recommendedActions,
  };
}
