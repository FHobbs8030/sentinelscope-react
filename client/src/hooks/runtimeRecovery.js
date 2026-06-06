import { isTerminalScanState } from "../services/runtime/scanStateMachine";

export function rebuildRuntimeScan(scan) {
  const terminal = isTerminalScanState(scan.status);

  return {
    id: scan._id || scan.id,

    mongoId: scan._id || scan.mongoId || null,

    name: scan.name ?? scan.target,

    target: scan.target,

    type: scan.scanType || scan.type || "recon",

    status: terminal ? scan.status : "interrupted",

    currentStage: scan.currentStage || scan.status || "queued",

    progress: scan.progress || 0,

    findingsCount: scan.findingsCount || 0,

    elapsedTime: scan.elapsedTime || 0,

    startedAt: scan.startedAt || new Date().toISOString(),

    updatedAt: scan.updatedAt || new Date().toISOString(),

    completedAt: scan.completedAt ?? null,

    severity: scan.severity || "low",

    live: false,

    activity: terminal
      ? `Recovered completed scan in ${scan.status} state`
      : `Recovered interrupted scan from ${scan.status} state`,
  };
}

export function rebuildRuntimeScans(scans = []) {
  if (!Array.isArray(scans)) {
    return [];
  }

  return scans.map(rebuildRuntimeScan);
}
