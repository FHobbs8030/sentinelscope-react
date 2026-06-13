import { THREAT_CONTEXT_TEMPLATES } from "./threatContextTemplates";
import { generateThreatNarrative } from "./threatNarrativeEngine";
import { generateBusinessImpact } from "./businessImpactEngine";
import { generateThreatActor } from "./threatActorEngine";
import { generateMitreAttack } from "./mitreAttackEngine";
import { generateIntelligenceConfidence } from "./intelligenceConfidenceEngine";
import { generateExecutiveRisk } from "./executiveRiskEngine";
import { generateRiskAssessment } from "./riskAssessmentEngine";

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

  const narrative = generateThreatNarrative(stage);

  const businessImpact = generateBusinessImpact(stage);

  const threatActor = generateThreatActor(stage);

  const mitreAttack = generateMitreAttack(stage);

  const riskAssessment = generateRiskAssessment({
    severity,
    stage,
  });

  const intelligenceConfidence = generateIntelligenceConfidence({
    severity,
    stage,
  });

  const executiveRisk = generateExecutiveRisk({
    riskAssessment,
    businessImpact,
    intelligenceConfidence,
  });

  return {
    threatContext: {
      category: template.category,
      attackStage: template.attackStage,
      impact: template.impact,
      confidence,
      source,
    },

    recommendedActions: template.recommendedActions,

    threatNarrative: narrative,

    businessImpact,

    threatActor,

    mitreAttack,

    riskAssessment,

    intelligenceConfidence,

    executiveRisk,
  };
}
