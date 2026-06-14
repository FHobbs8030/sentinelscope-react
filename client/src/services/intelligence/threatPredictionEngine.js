// client/src/services/intelligence/threatPredictionEngine.js

const NEXT_STAGE_MAP = {
  recon: "Enumeration Activity Likely",
  enumeration: "Analysis Activity Likely",
  analysis: "Exploitation Activity Likely",
  exploitation: "Post-Exploitation Activity Likely",
  reporting: "Continued Monitoring Recommended",
};

function predictNextStage(alert) {
  const stage = alert?.threatContext?.attackStage || alert?.category || "recon";

  return (
    NEXT_STAGE_MAP[stage.toLowerCase()] || "Continued Monitoring Recommended"
  );
}

function predictRiskTrend(alert) {
  const riskScore = alert?.riskScore || 0;
  const severity = alert?.severity?.toLowerCase();

  if (severity === "critical") {
    return "Critical";
  }

  if (riskScore >= 90) {
    return "Critical";
  }

  if (riskScore >= 75) {
    return "Increasing";
  }

  if (riskScore >= 50) {
    return "Stable";
  }

  return "Decreasing";
}

function estimateTimeToEscalation(alert) {
  const riskScore = alert?.riskScore || 0;

  if (riskScore >= 90) {
    return "Immediate";
  }

  if (riskScore >= 80) {
    return "2-4 Hours";
  }

  if (riskScore >= 70) {
    return "4-8 Hours";
  }

  if (riskScore >= 60) {
    return "8-24 Hours";
  }

  return "Monitor";
}

function calculatePredictionConfidence(alert) {
  const intelligenceScore = alert?.intelligenceConfidence?.score || 50;

  if (intelligenceScore >= 85) {
    return {
      score: 90,
      level: "High",
    };
  }

  if (intelligenceScore >= 65) {
    return {
      score: 75,
      level: "Medium",
    };
  }

  return {
    score: 55,
    level: "Low",
  };
}

function generatePredictionRationale(
  riskTrend,
  escalationWindow,
  confidenceLevel,
) {
  return (
    `Predicted threat progression indicates a ${riskTrend.toLowerCase()} ` +
    `risk trajectory with an estimated escalation window of ${escalationWindow.toLowerCase()}. ` +
    `Forecast confidence is currently assessed as ${confidenceLevel.toLowerCase()} ` +
    `based on available intelligence indicators and observed attack progression patterns.`
  );
}

function generateExecutiveForecast(
  predictedNextStage,
  riskTrend,
  escalationWindow,
) {
  return (
    `Observed threat activity suggests ${predictedNextStage.toLowerCase()}. ` +
    `Risk is currently assessed as ${riskTrend.toLowerCase()} with an estimated escalation ` +
    `window of ${escalationWindow.toLowerCase()}. Continued monitoring, proactive mitigation, ` +
    `and executive awareness are recommended to reduce operational and business risk.`
  );
}

export function generateThreatPrediction(alert = {}) {
  const predictedNextStage = predictNextStage(alert);

  const predictedRiskTrend = predictRiskTrend(alert);

  const estimatedTimeToEscalation = estimateTimeToEscalation(alert);

  const confidence = calculatePredictionConfidence(alert);

  const rationale = generatePredictionRationale(
    predictedRiskTrend,
    estimatedTimeToEscalation,
    confidence.level,
  );

  const executiveForecast = generateExecutiveForecast(
    predictedNextStage,
    predictedRiskTrend,
    estimatedTimeToEscalation,
  );

  return {
    predictedNextStage,
    predictedRiskTrend,
    estimatedTimeToEscalation,

    confidence,

    rationale,

    executiveForecast,
  };
}

export default {
  generateThreatPrediction,
};
