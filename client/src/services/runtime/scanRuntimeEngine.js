import {
  SCAN_STATE_METADATA,
  getNextScanState,
  getRandomStageMessage,
  isTerminalScanState,
  shouldFailScan,
} from "./scanStateMachine";

import scanEventBus from "./scanEventBus";
import { createScan, updateScan } from "../api/scansApi";

const RUNTIME_INTERVAL = 2000;

class ScanRuntimeEngine {
  constructor() {
    this.scans = [];

    this.intervalId = null;

    this.listeners = new Set();
  }

  initialize(initialScans = []) {
    this.scans = Array.isArray(initialScans) ? [...initialScans] : [];

    console.log("RUNTIME INITIALIZED:", this.scans);

    const interruptedCount = this.scans.filter(
      (scan) => scan.status === "interrupted",
    ).length;

    scanEventBus.emitTelemetry(
      `Recovered ${this.scans.length} persisted scans`,
      {
        source: "runtime-recovery",
        recoveredScans: this.scans.length,
      },
    );

    if (interruptedCount > 0) {
      scanEventBus.emitTelemetry(
        `${interruptedCount} interrupted scans require operator review`,
        {
          source: "runtime-recovery",
          interruptedScans: interruptedCount,
        },
      );
    }

    this.emit();
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
    this.scans = Array.isArray(scans) ? [...scans] : [];

    this.emit();
  }

  addScan(scan) {
    const runtimeScan = {
      id: scan.id ?? `scan-${crypto.randomUUID()}`,

      mongoId: scan.mongoId ?? null,

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

    createScan({
      name: runtimeScan.name ?? runtimeScan.target,
      target: runtimeScan.target,
      scanType: runtimeScan.type ?? "recon",
      status: runtimeScan.status,
      progress: runtimeScan.progress,
      findingsCount: runtimeScan.findingsCount,
      startedAt: runtimeScan.startedAt,
    })
      .then((response) => {
        console.log("CREATE SCAN RESPONSE:", response);

        runtimeScan.mongoId = response?._id ?? response?.data?._id ?? null;

        console.log("ASSIGNED MONGOID:", runtimeScan.mongoId);
      })
      .catch((error) => {
        console.error("Failed to persist scan:", error);
      });

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

        if (failedScan.mongoId) {
          updateScan(failedScan.mongoId, {
            status: failedScan.status,
            progress: failedScan.progress,
            findingsCount: failedScan.findingsCount,
            completedAt: null,
          }).catch((error) => {
            console.error("Failed to update failed scan:", error);
          });
        }

        return failedScan;
      }

      const currentMetadata = SCAN_STATE_METADATA[scan.status];

      const progressIncrease = this.randomNumber(2, 8);

      let progress = Math.min(100, (scan.progress ?? 0) + progressIncrease);

      let currentState = scan.status;

      if (
        currentMetadata &&
        progress >= currentMetadata.progressMax &&
        scan.status !== "reporting"
      ) {
        currentState = getNextScanState(scan.status);
      }

      const activeMetadata = SCAN_STATE_METADATA[currentState];

   if (activeMetadata) {
     if (currentState !== scan.status) {
       progress = activeMetadata.progressMin;
     } else {
       progress = Math.max(progress, activeMetadata.progressMin);

       progress = Math.min(progress, activeMetadata.progressMax);
     }
   }

      const findingsIncrease = this.generateFindings(currentState);

      const updatedScan = {
        ...scan,

        status: currentState,

        progress,

        findingsCount: (scan.findingsCount || 0) + findingsIncrease,

        elapsedTime: (scan.elapsedTime || 0) + RUNTIME_INTERVAL / 1000,

        activity: getRandomStageMessage(currentState),

        updatedAt: new Date().toISOString(),
      };

      if (scan.status !== currentState) {
        scanEventBus.emitStageChanged(scan.status, currentState, updatedScan);

        scanEventBus.emitTelemetry(
          `${updatedScan.target} entered ${currentState} stage`,
          {
            scanId: updatedScan.id,
            previousStage: scan.status,
            newStage: currentState,
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

      if (currentState === "initializing") {
        scanEventBus.emitScanStarted(updatedScan);
      }

      if (currentState === "completed") {
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

      if (updatedScan.mongoId) {
        updateScan(updatedScan.mongoId, {
          status: updatedScan.status,
          progress: updatedScan.progress,
          findingsCount: updatedScan.findingsCount,
          completedAt: updatedScan.completedAt ?? null,
        }).catch((error) => {
          console.error("Failed to update persisted scan:", error);
        });
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
