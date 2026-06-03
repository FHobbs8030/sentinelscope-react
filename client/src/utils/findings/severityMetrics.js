export function calculateSeverityMetrics(findings = []) {
  return findings.reduce(
    (metrics, finding) => {
      const severity = finding.severity?.toLowerCase();

      switch (severity) {
        case "critical":
          metrics.critical += 1;
          break;

        case "high":
          metrics.high += 1;
          break;

        case "medium":
          metrics.medium += 1;
          break;

        case "low":
          metrics.low += 1;
          break;

        default:
          metrics.informational += 1;
      }

      return metrics;
    },
    {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      informational: 0,
    },
  );
}

export function calculateRiskScore(findings = []) {
  const weights = {
    critical: 10,
    high: 7,
    medium: 4,
    low: 2,
    informational: 1,
  };

  return findings.reduce((score, finding) => {
    const severity = finding.severity?.toLowerCase();

    return score + (weights[severity] ?? 0);
  }, 0);
}
