import scanEventBus, { SCAN_EVENTS } from "./scanEventBus";

const subscribers = new Set();

let scans = [];

function notifySubscribers() {
  const scansSnapshot = [...scans];

  subscribers.forEach((callback) => {
    callback(scansSnapshot);
  });
}

function updateScan(scanId, updater) {
  scans = scans.map((scan) => {
    if (scan.id !== scanId) {
      return scan;
    }

    return updater(scan);
  });

  notifySubscribers();
}

function handleScanCreated(event) {
  const { scan } = event.payload;

  if (!scan) {
    return;
  }

  scans = [scan, ...scans];

  notifySubscribers();
}

function handleScanStarted(event) {
  const { scan } = event.payload;

  if (!scan) {
    return;
  }

  updateScan(scan.id, (existingScan) => ({
    ...existingScan,

    ...scan,

    status: "running",

    startedAt: scan.startedAt || new Date().toISOString(),
  }));
}

function handleStageChanged(event) {
  const { scan, previousStage, nextStage } = event.payload;

  if (!scan) {
    return;
  }

  updateScan(scan.id, (existingScan) => ({
    ...existingScan,

    ...scan,

    previousStage,

    currentStage: nextStage,
  }));
}

function handleProgressUpdated(event) {
  const { scan } = event.payload;

  if (!scan) {
    return;
  }

  updateScan(scan.id, (existingScan) => ({
    ...existingScan,

    ...scan,

    progress: scan.progress ?? existingScan.progress,
  }));
}

function handleScanCompleted(event) {
  const { scan } = event.payload;

  if (!scan) {
    return;
  }

  updateScan(scan.id, (existingScan) => ({
    ...existingScan,

    ...scan,

    status: "completed",

    progress: 100,

    completedAt: scan.completedAt || new Date().toISOString(),
  }));
}

function handleScanFailed(event) {
  const { scan } = event.payload;

  if (!scan) {
    return;
  }

  updateScan(scan.id, (existingScan) => ({
    ...existingScan,

    ...scan,

    status: "failed",

    failedAt: scan.failedAt || new Date().toISOString(),
  }));
}

function handleScanCancelled(event) {
  const { scan } = event.payload;

  if (!scan) {
    return;
  }

  updateScan(scan.id, (existingScan) => ({
    ...existingScan,

    ...scan,

    status: "cancelled",

    cancelledAt: scan.cancelledAt || new Date().toISOString(),
  }));
}

scanEventBus.subscribe(SCAN_EVENTS.SCAN_CREATED, handleScanCreated);

scanEventBus.subscribe(SCAN_EVENTS.SCAN_STARTED, handleScanStarted);

scanEventBus.subscribe(SCAN_EVENTS.SCAN_STAGE_CHANGED, handleStageChanged);

scanEventBus.subscribe(
  SCAN_EVENTS.SCAN_PROGRESS_UPDATED,
  handleProgressUpdated,
);

scanEventBus.subscribe(SCAN_EVENTS.SCAN_COMPLETED, handleScanCompleted);

scanEventBus.subscribe(SCAN_EVENTS.SCAN_FAILED, handleScanFailed);

scanEventBus.subscribe(SCAN_EVENTS.SCAN_CANCELLED, handleScanCancelled);

export function subscribe(callback) {
  subscribers.add(callback);

  callback([...scans]);

  return () => {
    subscribers.delete(callback);
  };
}

export function getScans() {
  return [...scans];
}

export function getActiveScans() {
  return scans.filter((scan) => scan.status === "running");
}

export function getCompletedScans() {
  return scans.filter((scan) => scan.status === "completed");
}

export function getFailedScans() {
  return scans.filter((scan) => scan.status === "failed");
}

export function clearScans() {
  scans = [];

  notifySubscribers();
}
