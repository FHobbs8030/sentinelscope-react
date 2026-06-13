export function generateExecutiveRisk({
  riskAssessment,
  businessImpact,
  intelligenceConfidence,
}) {
  const riskScore = riskAssessment?.score || 0;

  let level = "Low";
  let urgency = "Routine";
  let businessPriority = "P4";

  if (riskScore >= 90) {
    level = "Critical";
    urgency = "Immediate";
    businessPriority = "P1";
  } else if (riskScore >= 75) {
    level = "High";
    urgency = "Urgent";
    businessPriority = "P2";
  } else if (riskScore >= 50) {
    level = "Moderate";
    urgency = "Planned";
    businessPriority = "P3";
  }

  const summary = generateExecutiveSummary({
    level,
    businessImpact,
    intelligenceConfidence,
  });

  return {
    level,
    urgency,
    businessPriority,
    summary,
  };
}

function generateExecutiveSummary({
  level,
  businessImpact,
  intelligenceConfidence,
}) {
  const impact =
    businessImpact?.operationalImpact ||
    businessImpact?.summary ||
    "business operations";

  const confidence = intelligenceConfidence?.level || "moderate";

  return `${level} executive attention recommended. Potential impact to ${impact}. Intelligence confidence is ${confidence}. Leadership review and remediation planning advised.`;
}
