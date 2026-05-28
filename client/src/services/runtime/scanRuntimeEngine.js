import {
  SCAN_STATE_METADATA,
  getNextScanState,
  getRandomStageMessage,
  generateStageProgress,
  isTerminalScanState,
  shouldFailScan,
} from "./scanStateMachine";

import scanEventBus from "./scanEventBus";

const RUNTIME_INTERVAL = 2000;

class ScanRuntimeEngine {
  constructor() {
    this.scans = [];

    this.intervalId = null;

    this.listeners = new Set();
  }

  initialize(initialScans = []) {
    this.scans = [...initialScans];
  }

  start() {
    if (this.intervalId) {
      return;
    }

    scanEventBus.emitTelemetry("SentinelScope runtime engine initialized", {
      source: "runtime-engine",
    });

    this.intervalId = setInterval(() => {
      this.updateActiveScans();
    }, RUNTIME_INTERVAL);
  }

  stop() {
    if (!this.intervalId) {
      return;
    }

    clearInterval(this.intervalId);

    this.intervalId = null;

    scanEventBus.emitTelemetry("SentinelScope runtime engine stopped", {
      source: "runtime-engine",
    });
  }

  destroy() {
    this.stop();

    this.scans = [];

    this.listeners.clear();

    scanEventBus.emitTelemetry("Runtime engine destroyed", {
      source: "runtime-engine",
    });
  }

  subscribe(listener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  emit() {
    const snapshot = [...this.scans];

    this.listeners.forEach((listener) => {
      listener(snapshot);
    });
  }

  getScans() {
    return [...this.scans];
  }

  setScans(scans = []) {
    this.scans = [...scans];

    this.emit();
  }

  addScan(scan) {
    const runtimeScan = {
      id:
        scan.id ??
        `scan-${crypto.randomUUID()}`,

      progress: 0,

      findingsCount: 0,

      elapsedTime: 0,

      startedAt: new Date().toISOString(),

      updatedAt: new Date().toISOString(),

      status: "queued",

      severity: scan.severity ?? "low",

      activity: "Scan added to operational queue",

      live: true,

      ...scan,
    };

    this.scans.unshift(runtimeScan);

    scanEventBus.emitScanCreated(runtimeScan);

    scanEventBus.emitTelemetry(`New scan queued for ${runtimeScan.target}`, {
      scanId: runtimeScan.id,
      target: runtimeScan.target,
      type: runtimeScan.type,
    });

    this.emit();
  }

  removeScan(scanId) {
    const removedScan = this.scans.find((scan) => scan.id === scanId);

    this.scans = this.scans.filter((scan) => scan.id !== scanId);

    if (removedScan) {
      scanEventBus.emitTelemetry(`Scan removed: ${removedScan.target}`, {
        scanId: removedScan.id,
      });
    }

    this.emit();
  }

  cancelScan(scanId) {
    this.scans = this.scans.map((scan) => {
      if (scan.id !== scanId) {
        return scan;
      }

      const cancelledScan = {
        ...scan,

        status: "cancelled",

        live: false,

        activity: "Operational scan cancelled by operator",

        updatedAt: new Date().toISOString(),
      };

      scanEventBus.emitScanCancelled(cancelledScan);

      scanEventBus.emitTelemetry(`Scan cancelled for ${cancelledScan.target}`, {
        scanId: cancelledScan.id,
      });

      return cancelledScan;
    });

    this.emit();
  }

  updateActiveScans() {
    const updatedScans = this.scans.map((scan) => {
      if (isTerminalScanState(scan.status)) {
        return scan;
      }

      const metadata = SCAN_STATE_METADATA[scan.status];

      if (!metadata) {
        return scan;
      }

      if (shouldFailScan(scan.status)) {
        const failedScan = {
          ...scan,

          status: "failed",

          live: false,

          activity: "Operational runtime failure detected",

          updatedAt: new Date().toISOString(),
        };

        scanEventBus.emitScanFailed(failedScan);

        scanEventBus.emitTelemetry(
          `Runtime failure detected on ${failedScan.target}`,
          {
            scanId: failedScan.id,
            target: failedScan.target,
          },
        );

        return failedScan;
      }

      const nextState = getNextScanState(scan.status);

      const progress = generateStageProgress(nextState);

      const findingsIncrease = this.generateFindings(nextState);

      const updatedScan = {
        ...scan,

        status: nextState,

        progress,

        findingsCount: (scan.findingsCount || 0) + findingsIncrease,

        elapsedTime: (scan.elapsedTime || 0) + RUNTIME_INTERVAL / 1000,

        activity: getRandomStageMessage(nextState),

        updatedAt: new Date().toISOString(),
      };

      if (scan.status !== nextState) {
        scanEventBus.emitStageChanged(scan.status, nextState, updatedScan);

        scanEventBus.emitTelemetry(
          `${updatedScan.target} entered ${nextState} stage`,
          {
            scanId: updatedScan.id,
            previousStage: scan.status,
            nextState,
          },
        );
      }

      scanEventBus.emitProgressUpdated(updatedScan);

      if (findingsIncrease > 0) {
        scanEventBus.emitFindingDiscovered(
          {
            value: findingsIncrease,
            total: updatedScan.findingsCount,
          },
          updatedScan.severity,
          updatedScan,
        );

        scanEventBus.emitTelemetry(
          `${findingsIncrease} findings discovered on ${updatedScan.target}`,
          {
            scanId: updatedScan.id,
            severity: updatedScan.severity,
            findings: updatedScan.findingsCount,
          },
        );
      }

      if (nextState === "initializing") {
        scanEventBus.emitScanStarted(updatedScan);
      }

      if (nextState === "completed") {
        updatedScan.completedAt = new Date().toISOString();

        updatedScan.progress = 100;

        updatedScan.live = false;

        updatedScan.activity = "Scan completed successfully";

        scanEventBus.emitScanCompleted(updatedScan);

        scanEventBus.emitTelemetry(
          `Operational scan completed for ${updatedScan.target}`,
          {
            scanId: updatedScan.id,
            findings: updatedScan.findingsCount,
          },
        );
      }

      return updatedScan;
    });

    this.scans = updatedScans;

    this.emit();
  }

  generateFindings(state) {
    switch (state) {
      case "recon":
        return this.randomNumber(0, 1);

      case "enumeration":
        return this.randomNumber(1, 3);

      case "analysis":
        return this.randomNumber(2, 5);

      case "exploitation":
        return this.randomNumber(1, 4);

      default:
        return 0;
    }
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

const scanRuntimeEngine = new ScanRuntimeEngine();

export default scanRuntimeEngine;
