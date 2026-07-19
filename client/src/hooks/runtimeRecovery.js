import { isTerminalScanState } from "../services/runtime/scanStateMachine";

export function rebuildRuntimeScan(scan) {
  const terminal = isTerminalScanState(scan.status);

  return {
    id: scan.clientScanId || scan._id || scan.id,

    mongoId: scan._id || scan.mongoId || null,

    missionId: scan.missionId ?? null,

    missionMongoId: scan.missionMongoId ?? null,

    name: scan.name ?? scan.target,

    target: scan.target,

    type: scan.scanType || scan.type || "recon",

    status: terminal
      ? scan.status
      : scan.currentStage || scan.status || "queued",

    currentStage: scan.currentStage || scan.status || "queued",

    progress: scan.progress || 0,

    findingsCount: scan.findingsCount || 0,

    elapsedTime: scan.elapsedTime || 0,

    startedAt: scan.startedAt || new Date().toISOString(),

    updatedAt: scan.updatedAt || new Date().toISOString(),

    completedAt: scan.completedAt ?? null,

    severity: scan.severity || "low",

    live: !terminal,

    activity: terminal
      ? `Recovered completed scan in ${scan.status} state`
      : `Recovered active scan in ${scan.currentStage || scan.status} stage`,
  };
}

export function rebuildRuntimeScans(scans = []) {
  if (!Array.isArray(scans)) {
    return [];
  }

  return scans.map(rebuildRuntimeScan);
}
