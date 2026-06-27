const SEVERITY_WEIGHTS = {
  critical: 10,
  high: 7,
  medium: 4,
  low: 2,
  informational: 1,
};

const normalizeSeverity = (severity) => {
  const normalizedSeverity = String(severity ?? "")
    .trim()
    .toLowerCase();

  return Object.hasOwn(SEVERITY_WEIGHTS, normalizedSeverity)
    ? normalizedSeverity
    : "informational";
};

export function calculateSeverityMetrics(findings = []) {
  const safeFindings = Array.isArray(findings) ? findings : [];

  return safeFindings.reduce(
    (metrics, finding) => {
      const severity = normalizeSeverity(finding.severity);

      metrics[severity] += 1;
      metrics.total += 1;

      return metrics;
    },
    {
      total: 0,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      informational: 0,
    },
  );
}

export function calculateFindingExposureScore(findings = []) {
  const safeFindings = Array.isArray(findings) ? findings : [];

  return safeFindings.reduce((score, finding) => {
    const severity = normalizeSeverity(finding.severity);

    return score + SEVERITY_WEIGHTS[severity];
  }, 0);
}

/*
 * Temporary compatibility export.
 * Remove after all calculateRiskScore imports have been migrated.
 */
export const calculateRiskScore = calculateFindingExposureScore;
