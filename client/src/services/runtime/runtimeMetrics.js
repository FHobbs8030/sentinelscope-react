const TERMINAL_SCAN_STATES = ["completed", "failed", "cancelled"];

const ACTIVE_SCAN_STATES = [
  "queued",
  "initializing",
  "recon",
  "enumeration",
  "analysis",
  "exploitation",
  "reporting",
];

const CRITICAL_SEVERITY_LEVELS = ["critical"];

const HIGH_SEVERITY_LEVELS = ["high"];

const MEDIUM_SEVERITY_LEVELS = ["medium"];

const LOW_SEVERITY_LEVELS = ["low"];

export const calculateRuntimeMetrics = (scans = []) => {
  const totalScans = scans.length;

  const activeScans = scans.filter((scan) =>
    ACTIVE_SCAN_STATES.includes(scan.status),
  );

  const terminalScans = scans.filter((scan) =>
    TERMINAL_SCAN_STATES.includes(scan.status),
  );

  const queuedScans = scans.filter((scan) => scan.status === "queued");

  const completedScans = scans.filter((scan) => scan.status === "completed");

  const failedScans = scans.filter((scan) => scan.status === "failed");

  const cancelledScans = scans.filter((scan) => scan.status === "cancelled");

  const criticalScans = scans.filter((scan) =>
    CRITICAL_SEVERITY_LEVELS.includes(scan.severity?.toLowerCase()),
  );

  const highSeverityScans = scans.filter((scan) =>
    HIGH_SEVERITY_LEVELS.includes(scan.severity?.toLowerCase()),
  );

  const mediumSeverityScans = scans.filter((scan) =>
    MEDIUM_SEVERITY_LEVELS.includes(scan.severity?.toLowerCase()),
  );

  const lowSeverityScans = scans.filter((scan) =>
    LOW_SEVERITY_LEVELS.includes(scan.severity?.toLowerCase()),
  );

  const totalFindings = scans.reduce((total, scan) => {
    return total + (scan.findings ?? 0);
  }, 0);

  const criticalFindings = criticalScans.reduce((total, scan) => {
    return total + (scan.findings ?? 0);
  }, 0);

  const highFindings = highSeverityScans.reduce((total, scan) => {
    return total + (scan.findings ?? 0);
  }, 0);

  const mediumFindings = mediumSeverityScans.reduce((total, scan) => {
    return total + (scan.findings ?? 0);
  }, 0);

  const lowFindings = lowSeverityScans.reduce((total, scan) => {
    return total + (scan.findings ?? 0);
  }, 0);

  const successRate =
    totalScans > 0 ? Math.round((completedScans.length / totalScans) * 100) : 0;

  const failureRate =
    totalScans > 0 ? Math.round((failedScans.length / totalScans) * 100) : 0;

  const averageFindings =
    totalScans > 0 ? Math.round(totalFindings / totalScans) : 0;

  const averageRuntime =
    totalScans > 0
      ? Math.round(
          scans.reduce((total, scan) => {
            return total + (scan.elapsedTime ?? 0);
          }, 0) / totalScans,
        )
      : 0;

  const activeRuntimeLoad = activeScans.length;

  const systemLoad = determineSystemLoad(
    activeRuntimeLoad,
    failureRate,
    criticalFindings,
  );

  const scanDistribution = calculateScanDistribution(scans);

  const findingsBySeverity = {
    critical: criticalFindings,
    high: highFindings,
    medium: mediumFindings,
    low: lowFindings,
  };

  const targetFindings = calculateTargetFindings(scans);

  const operationalHealth = calculateOperationalHealth({
    activeRuntimeLoad,
    failureRate,
    criticalFindings,
    queuedScans: queuedScans.length,
  });

  return {
    totalScans,
    activeScans: activeScans.length,
    terminalScans: terminalScans.length,
    queuedScans: queuedScans.length,
    completedScans: completedScans.length,
    failedScans: failedScans.length,
    cancelledScans: cancelledScans.length,
    totalFindings,
    criticalFindings,
    successRate,
    failureRate,
    averageFindings,
    averageRuntime,
    activeRuntimeLoad,
    systemLoad,
    findingsBySeverity,
    scanDistribution,
    targetFindings,
    operationalHealth,
  };
};

export const determineSystemLoad = (
  activeScans = 0,
  failureRate = 0,
  criticalFindings = 0,
) => {
  const loadScore = activeScans * 2 + failureRate + criticalFindings;

  if (loadScore >= 40) {
    return "critical";
  }

  if (loadScore >= 28) {
    return "high";
  }

  if (loadScore >= 14) {
    return "moderate";
  }

  return "low";
};

export const calculateScanDistribution = (scans = []) => {
  if (!scans.length) {
    return [];
  }

  const distributionMap = scans.reduce((accumulator, scan) => {
    const type = scan.type ?? "Unknown";

    accumulator[type] = (accumulator[type] ?? 0) + 1;

    return accumulator;
  }, {});

  return Object.entries(distributionMap).map(([type, count]) => ({
    type,
    count,
    percentage: Math.round((count / scans.length) * 100),
  }));
};

export const calculateTargetFindings = (scans = []) => {
  return scans
    .map((scan) => ({
      target: scan.target,
      findings: scan.findings ?? 0,
    }))
    .sort((a, b) => b.findings - a.findings)
    .slice(0, 5);
};

export const calculateOperationalHealth = ({
  activeRuntimeLoad = 0,
  failureRate = 0,
  criticalFindings = 0,
  queuedScans = 0,
}) => {
  return {
    scannerEngine: failureRate > 40 ? "degraded" : "online",

    threatDatabase: criticalFindings > 20 ? "under-load" : "synced",

    queueProcessor: queuedScans > 6 ? "congested" : "healthy",

    apiGateway: activeRuntimeLoad > 10 ? "high-load" : "operational",
  };
};

export const formatRuntimeDuration = (seconds = 0) => {
  const hours = Math.floor(seconds / 3600);

  const minutes = Math.floor((seconds % 3600) / 60);

  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }

  return `${remainingSeconds}s`;
};

export default calculateRuntimeMetrics;
