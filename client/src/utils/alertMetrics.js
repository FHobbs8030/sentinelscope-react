export function calculateAlertMetrics(alerts = []) {
  const openAlerts = alerts.filter((alert) => alert.status === "open").length;

  const acknowledgedAlerts = alerts.filter(
    (alert) => alert.status === "acknowledged",
  ).length;

  const resolvedAlerts = alerts.filter(
    (alert) => alert.status === "resolved",
  ).length;

  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "critical",
  ).length;

  const highAlerts = alerts.filter((alert) => alert.severity === "high").length;

  const mediumAlerts = alerts.filter(
    (alert) => alert.severity === "medium",
  ).length;

  const lowAlerts = alerts.filter((alert) => alert.severity === "low").length;

  return {
    totalAlerts: alerts.length,

    openAlerts,

    acknowledgedAlerts,

    resolvedAlerts,

    criticalAlerts,

    highAlerts,

    mediumAlerts,

    lowAlerts,
  };
}

export function calculateAlertRiskScore(alerts = []) {
  const severityWeights = {
    critical: 10,
    high: 6,
    medium: 3,
    low: 1,
  };

  const score = alerts.reduce((total, alert) => {
    return total + (severityWeights[alert.severity] || 0);
  }, 0);

  return Math.min(score, 100);
}
