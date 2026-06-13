const CONFIDENCE_LEVELS = {
  low: {
    score: 45,
    level: "Low",
  },

  medium: {
    score: 70,
    level: "Medium",
  },

  high: {
    score: 92,
    level: "High",
  },
};

export function generateIntelligenceConfidence({ severity, stage }) {
  if (severity === "critical") {
    return {
      ...CONFIDENCE_LEVELS.high,
      rationale:
        "Multiple intelligence indicators support the assessment with high confidence.",
    };
  }

  if (severity === "high" || stage === "analysis" || stage === "exploitation") {
    return {
      ...CONFIDENCE_LEVELS.high,
      rationale:
        "Observed activity aligns strongly with threat intelligence and attack behavior indicators.",
    };
  }

  if (stage === "recon" || stage === "enumeration") {
    return {
      ...CONFIDENCE_LEVELS.medium,
      rationale:
        "Assessment is supported by contextual indicators but remains partially inferred.",
    };
  }

  return {
    ...CONFIDENCE_LEVELS.low,
    rationale:
      "Limited evidence is available to support a strong intelligence assessment.",
  };
}
