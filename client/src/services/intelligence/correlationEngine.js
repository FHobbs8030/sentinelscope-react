const ATTACK_CHAIN = [
  "recon",
  "enumeration",
  "analysis",
  "exploitation",
  "reporting",
];

function normalizeStage(stage = "") {
  const value = stage.toLowerCase();

  if (value.includes("recon") || value.includes("reconnaissance")) {
    return "recon";
  }

  if (value.includes("enumeration")) {
    return "enumeration";
  }

  if (value.includes("analysis")) {
    return "analysis";
  }

  if (value.includes("exploitation")) {
    return "exploitation";
  }

  if (value.includes("report")) {
    return "reporting";
  }

  return "recon";
}

function determineRiskLevel(alertCount, stageCount, criticalCount) {
  let score = 0;

  score += alertCount * 5;
  score += stageCount * 15;
  score += criticalCount * 20;

  if (score >= 80) return "Critical";
  if (score >= 60) return "High";
  if (score >= 40) return "Medium";

  return "Low";
}

function determineConfidence(alertCount, stageCount, actorCount) {
  let score = 0;

  score += alertCount * 10;
  score += stageCount * 15;

  if (actorCount === 1) {
    score += 20;
  }

  score = Math.min(score, 100);

  if (score >= 80) {
    return {
      score,
      level: "High",
    };
  }

  if (score >= 50) {
    return {
      score,
      level: "Medium",
    };
  }

  return {
    score,
    level: "Low",
  };
}

function determineCampaignName(highestStage) {
  switch (highestStage) {
    case "exploitation":
      return "Active Exploitation Campaign";

    case "analysis":
      return "Attack Progression Campaign";

    case "enumeration":
      return "Discovery Campaign";

    default:
      return "Reconnaissance Campaign";
  }
}

export function generateCorrelationAssessment(alerts = []) {
  if (!alerts.length) {
    return null;
  }

  const target = alerts[0]?.target ?? "Unknown Target";

  const stagesObserved = [
    ...new Set(
      alerts
        .map((alert) =>
          normalizeStage(
            alert?.threatContext?.stage || alert?.threatContext?.category,
          ),
        )
        .filter(Boolean),
    ),
  ];

  const highestStage =
    [...stagesObserved].sort(
      (a, b) => ATTACK_CHAIN.indexOf(b) - ATTACK_CHAIN.indexOf(a),
    )[0] ?? "recon";

  const threatActors = [
    ...new Set(
      alerts.map((alert) => alert?.threatActor?.actor).filter(Boolean),
    ),
  ];

  const mitreTechniques = [
    ...new Set(
      alerts.map((alert) => alert?.mitreAttack?.techniqueId).filter(Boolean),
    ),
  ];

  const criticalCount = alerts.filter(
    (alert) => alert?.severity === "critical",
  ).length;

  const severityDistribution = {
    critical: alerts.filter((alert) => alert?.severity === "critical").length,

    high: alerts.filter((alert) => alert?.severity === "high").length,

    medium: alerts.filter((alert) => alert?.severity === "medium").length,

    low: alerts.filter((alert) => alert?.severity === "low").length,
  };

  const riskLevel = determineRiskLevel(
    alerts.length,
    stagesObserved.length,
    criticalCount,
  );

  const confidence = determineConfidence(
    alerts.length,
    stagesObserved.length,
    threatActors.length,
  );

  return {
    campaignId: `campaign-${target}-${Date.now()}`,

    name: determineCampaignName(highestStage),

    target,

    relatedAlerts: alerts.length,

    stagesObserved,

    threatActors,

    mitreTechniques,

    severityDistribution,

    riskLevel,

    confidence,

    indicators: [
      "Multi-stage activity detected",
      "Repeated targeting observed",
      "Campaign correlation identified",
    ],

    summary:
      "Multiple related activities indicate coordinated attack progression.",
  };
}
