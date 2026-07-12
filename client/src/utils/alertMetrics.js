const TERMINAL_ALERT_STATUSES = new Set(["resolved", "closed"]);

const ALERT_SEVERITY_WEIGHTS = {
  critical: 10,
  high: 6,
  medium: 3,
  low: 1,
};

const normalizeValue = (value = "") => {
  return String(value).trim().toLowerCase();
};

const getAlertStatus = (alert = {}) => {
  return normalizeValue(
    alert.status ?? alert.state ?? alert.lifecycleStatus ?? "open",
  );
};

const getAlertSeverity = (alert = {}) => {
  return normalizeValue(
    alert.severity ?? alert.priority ?? alert.riskLevel ?? "unknown",
  );
};

const isActiveAlert = (alert = {}) => {
  return !TERMINAL_ALERT_STATUSES.has(getAlertStatus(alert));
};

export function calculateAlertMetrics(alerts = []) {
  const safeAlerts = Array.isArray(alerts) ? alerts : [];

  const activeAlerts = safeAlerts.filter(isActiveAlert);

  const countByStatus = (status) => {
    return safeAlerts.filter((alert) => getAlertStatus(alert) === status)
      .length;
  };

  const countActiveBySeverity = (severity) => {
    return activeAlerts.filter((alert) => getAlertSeverity(alert) === severity)
      .length;
  };

  return {
    totalAlerts: safeAlerts.length,

    activeAlerts: activeAlerts.length,

    openAlerts: countByStatus("open"),

    acknowledgedAlerts: countByStatus("acknowledged"),

    investigatingAlerts: countByStatus("investigating"),

    resolvedAlerts: countByStatus("resolved"),

    closedAlerts: countByStatus("closed"),

    criticalAlerts: countActiveBySeverity("critical"),

    highAlerts: countActiveBySeverity("high"),

    mediumAlerts: countActiveBySeverity("medium"),

    lowAlerts: countActiveBySeverity("low"),
  };
}

export function calculateAlertRiskScore(alerts = []) {
  const safeAlerts = Array.isArray(alerts) ? alerts : [];

  const activeAlerts = safeAlerts.filter(isActiveAlert);

  const weightedScore = activeAlerts.reduce((total, alert) => {
    const severity = getAlertSeverity(alert);

    return total + (ALERT_SEVERITY_WEIGHTS[severity] ?? 0);
  }, 0);

  return Math.min(weightedScore, 100);
}
