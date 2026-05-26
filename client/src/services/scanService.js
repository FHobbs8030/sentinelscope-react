import mockScans from "../data/mock/mockScans";

const NETWORK_DELAY = 300;

const simulateNetworkDelay = (data) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, NETWORK_DELAY);
  });

const sortByNewest = (scans) => {
  return [...scans].sort((a, b) => {
    const aTime = new Date(a.startedAt || a.queuedAt).getTime();
    const bTime = new Date(b.startedAt || b.queuedAt).getTime();

    return bTime - aTime;
  });
};

const getScans = async () => {
  return simulateNetworkDelay(sortByNewest(mockScans));
};

const getScanById = async (scanId) => {
  const scan = mockScans.find((item) => item.id === scanId);

  return simulateNetworkDelay(scan || null);
};

const getActiveScans = async () => {
  const activeStatuses = ["Running", "Initializing", "Queued"];

  const scans = mockScans.filter((scan) =>
    activeStatuses.includes(scan.status),
  );

  return simulateNetworkDelay(sortByNewest(scans));
};

const getCompletedScans = async () => {
  const scans = mockScans.filter((scan) => scan.status === "Completed");

  return simulateNetworkDelay(sortByNewest(scans));
};

const getFailedScans = async () => {
  const scans = mockScans.filter((scan) => scan.status === "Failed");

  return simulateNetworkDelay(sortByNewest(scans));
};

const getCriticalScans = async () => {
  const scans = mockScans.filter((scan) => scan.severity === "Critical");

  return simulateNetworkDelay(sortByNewest(scans));
};

const getRunningScans = async () => {
  const scans = mockScans.filter((scan) => scan.status === "Running");

  return simulateNetworkDelay(sortByNewest(scans));
};

const getQueuedScans = async () => {
  const scans = mockScans.filter((scan) => scan.status === "Queued");

  return simulateNetworkDelay(sortByNewest(scans));
};

const getPausedScans = async () => {
  const scans = mockScans.filter((scan) => scan.status === "Paused");

  return simulateNetworkDelay(sortByNewest(scans));
};

const getScansByTarget = async (target) => {
  const normalizedTarget = target.toLowerCase();

  const scans = mockScans.filter((scan) =>
    scan.target.toLowerCase().includes(normalizedTarget),
  );

  return simulateNetworkDelay(sortByNewest(scans));
};

const getScansByType = async (type) => {
  const scans = mockScans.filter((scan) => scan.type === type);

  return simulateNetworkDelay(sortByNewest(scans));
};

const getScanMetrics = async () => {
  const totalScans = mockScans.length;

  const runningScans = mockScans.filter(
    (scan) => scan.status === "Running",
  ).length;

  const completedScans = mockScans.filter(
    (scan) => scan.status === "Completed",
  ).length;

  const failedScans = mockScans.filter(
    (scan) => scan.status === "Failed",
  ).length;

  const queuedScans = mockScans.filter(
    (scan) => scan.status === "Queued",
  ).length;

  const totalFindings = mockScans.reduce((sum, scan) => sum + scan.findings, 0);

  const criticalFindings = mockScans.filter(
    (scan) => scan.severity === "Critical",
  ).length;

  const metrics = {
    totalScans,
    runningScans,
    completedScans,
    failedScans,
    queuedScans,
    totalFindings,
    criticalFindings,
  };

  return simulateNetworkDelay(metrics);
};

const scanService = {
  getScans,
  getScanById,
  getActiveScans,
  getCompletedScans,
  getFailedScans,
  getCriticalScans,
  getRunningScans,
  getQueuedScans,
  getPausedScans,
  getScansByTarget,
  getScansByType,
  getScanMetrics,
};

export default scanService;
