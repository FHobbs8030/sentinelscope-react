const SEVERITY_SCORES = {
  critical: 90,
  high: 70,
  medium: 50,
  low: 25,
};

const STAGE_BONUS = {
  recon: 0,
  enumeration: 5,
  analysis: 10,
  exploitation: 15,
  reporting: 0,
  failure: 5,
};

export function calculateRiskScore({ severity, stage, findingsCount = 0 }) {
  const baseScore = SEVERITY_SCORES[severity?.toLowerCase()] ?? 25;

  const stageBonus = STAGE_BONUS[stage] ?? 0;

  const findingsBonus = Math.min(findingsCount, 10);

  const riskScore = baseScore + stageBonus + findingsBonus;

  return Math.min(riskScore, 100);
}
