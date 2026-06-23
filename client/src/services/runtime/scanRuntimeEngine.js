import missionStore from "../orchestration/missionStore";
import {
  SCAN_STATE_METADATA,
  getNextScanState,
  getRandomStageMessage,
  isTerminalScanState,
  shouldFailScan,
} from "./scanStateMachine";

import scanEventBus from "./scanEventBus";
import { createScan, updateScan } from "../api/scansApi";
import { createFinding } from "../api/findingsApi";
import { createAlert } from "../api/alertsApi";
import { updateMission } from "../api/missionsApi";
import { generateThreatIntelligence } from "../intelligence/threatIntelligenceEngine";
import { generateThreatPrediction } from "../intelligence/threatPredictionEngine";
import { calculateRiskScore } from "../intelligence/riskAssessmentEngine";
import {
  createMissionProfile,
  determineMissionOutcome,
} from "./missionOutcomeEngine";

const RUNTIME_INTERVAL = 2000;

class ScanRuntimeEngine {
  constructor() {
    this.scans = [];

    this.intervalId = null;

    this.listeners = new Set();
  }

  initialize(initialScans = []) {
    this.scans = Array.isArray(initialScans) ? [...initialScans] : [];

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

  async addScan(scan) {
    const runtimeScan = {
      id: scan.id ?? `scan-${crypto.randomUUID()}`,

      mongoId: scan.mongoId ?? null,

      missionId: scan.missionId ?? null,

      missionMongoId: scan.missionMongoId ?? null,

      progress: 0,

      findingsCount: 0,

      elapsedTime: 0,

      startedAt: new Date().toISOString(),

      updatedAt: new Date().toISOString(),

      status: "queued",

      severity: scan.severity ?? "low",

      runtimeProfile:
        scan.runtimeProfile ??
        createMissionProfile({
          scanType: scan.type,
          severity: scan.severity,
        }),

      activity: "Scan added to operational queue",

      live: true,

      ...scan,
    };

    this.scans.unshift(runtimeScan);

    try {
      const response = await createScan({
        name: runtimeScan.name ?? runtimeScan.target,

        target: runtimeScan.target,

        missionId: runtimeScan.missionId,
        missionMongoId: runtimeScan.missionMongoId,

        scanType: runtimeScan.type ?? "recon",

        severity: runtimeScan.severity,
        profile: runtimeScan.profile,

        status: runtimeScan.status,
        currentStage: runtimeScan.status,

        runtimeState: "active",

        progress: runtimeScan.progress,
        findingsCount: runtimeScan.findingsCount,

        startedAt: runtimeScan.startedAt,
      });

      runtimeScan.mongoId = response?.data?._id ?? response?._id ?? null;
    } catch (error) {
      console.error("Failed to persist scan:", error);
    }

    scanEventBus.emitScanCreated(runtimeScan);

    scanEventBus.emitTelemetry(`New scan queued for ${runtimeScan.target}`, {
      scanId: runtimeScan.id,
      target: runtimeScan.target,
      type: runtimeScan.type,
    });

    this.emit();

    return runtimeScan;
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

      if (cancelledScan.mongoId) {
        updateScan(cancelledScan.mongoId, {
          status: "cancelled",
          runtimeState: "completed",
        }).catch((error) => {
          console.error("Failed to update cancelled scan:", error);
        });
      }

      this.synchronizeMission(cancelledScan, "cancelled");

      return cancelledScan;
    });

    this.emit();
  }

  resumeScan(scanId) {
    this.scans = this.scans.map((scan) => {
      const matchesId = scan.id === scanId || scan.mongoId === scanId;

      if (!matchesId) {
        return scan;
      }

      const resumedScan = {
        ...scan,

        status: scan.currentStage || "queued",

        live: true,

        activity: `Resumed from ${scan.currentStage || "queued"} stage`,

        updatedAt: new Date().toISOString(),
      };

      scanEventBus.emitTelemetry(`Scan resumed for ${resumedScan.target}`, {
        scanId: resumedScan.id,
      });

      if (resumedScan.mongoId) {
        updateScan(resumedScan.mongoId, {
          status: resumedScan.status,

          currentStage: resumedScan.currentStage,

          runtimeState: "active",

          progress: resumedScan.progress,

          findingsCount: resumedScan.findingsCount,
        }).catch((error) => {
          console.error("Failed to update resumed scan:", error);
        });
      }

      return resumedScan;
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

        this.synchronizeMission(failedScan, "failed");

        if (failedScan.mongoId) {
          const intelligence = generateThreatIntelligence({
            stage: "failure",
            severity: "high",
            source: "runtime-engine",
          });

          const riskScore = calculateRiskScore({
            severity: "high",
            stage: "failure",
          });

          const prediction = generateThreatPrediction({
            riskScore,
            severity: "high",
            threatContext: intelligence.threatContext,
            threatActor: intelligence.threatActor,
            intelligenceConfidence: intelligence.intelligenceConfidence,
            executiveRisk: intelligence.executiveRisk,
          });

          createAlert({
            title: "Runtime Scan Failure",

            description: `Operational runtime failure detected on ${failedScan.target}`,

            severity: "high",

            target: failedScan.target,

            scanId: failedScan.mongoId,

            missionId: failedScan.missionId,

            source: "runtime-engine",

            status: "open",

            evidence: [
              "Runtime engine failure detected",
              `Scan terminated during ${failedScan.status} stage`,
            ],

            riskScore,

            affectedAsset: failedScan.target,

            recommendedActions: intelligence.recommendedActions,

            threatContext: intelligence.threatContext,

            threatNarrative: intelligence.threatNarrative,

            businessImpact: intelligence.businessImpact,

            threatActor: intelligence.threatActor,

            mitreAttack: intelligence.mitreAttack,

            intelligenceConfidence: intelligence.intelligenceConfidence,

            executiveRisk: intelligence.executiveRisk,

            decisionIntelligence: intelligence.decisionIntelligence,

            prediction,

            relatedFindings: [],
          }).catch((error) => {
            console.error("Failed to create runtime alert:", error);
          });
        }

        return failedScan;
      }

      const currentMetadata = SCAN_STATE_METADATA[scan.status];

      const progressIncrease = this.randomNumber(2, 8);

      let progress = Math.min(100, (scan.progress ?? 0) + progressIncrease);

      let currentState = scan.status;

      if (currentMetadata && progress >= currentMetadata.progressMax) {
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

      const findingsIncrease = this.generateFindings(
        currentState,
        scan.runtimeProfile,
      );

      const updatedScan = {
        ...scan,

        status: currentState,

        currentStage: currentState,

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

      if (
        findingsIncrease > 0 &&
        updatedScan.mongoId &&
        updatedScan.missionId
      ) {
        for (let i = 0; i < findingsIncrease; i += 1) {
          createFinding({
            scanId: updatedScan.mongoId,

            missionId: updatedScan.missionId,

            target: updatedScan.target,

            title: `${currentState.toUpperCase()} Discovery`,

            description: `Runtime finding generated during ${currentState} stage`,

            severity: updatedScan.severity,

            category: currentState,

            status: "open",
          })
            .then((findingResponse) => {
              const severity = updatedScan.severity?.toLowerCase();
              const intelligence = generateThreatIntelligence({
                stage: currentState,
                severity,
                source: "finding-engine",
              });

              const riskScore = calculateRiskScore({
                severity,
                stage: currentState,
                findingsCount: updatedScan.findingsCount,
              });

              const prediction = generateThreatPrediction({
                riskScore,
                severity,
                threatContext: intelligence.threatContext,
                threatActor: intelligence.threatActor,
                intelligenceConfidence: intelligence.intelligenceConfidence,
                executiveRisk: intelligence.executiveRisk,
              });

              const findingId =
                findingResponse?.data?._id ?? findingResponse?._id ?? null;
              if (severity === "critical" || severity === "high") {
                return createAlert({
                  title:
                    severity === "critical"
                      ? "Critical Security Finding"
                      : "High Severity Security Finding",

                  description: `${currentState.toUpperCase()} discovery detected on ${updatedScan.target}`,

                  severity,

                  target: updatedScan.target,

                  scanId: updatedScan.mongoId,

                  missionId: updatedScan.missionId,

                  source: "finding-engine",

                  status: "open",

                  evidence: [
                    `${currentState.toUpperCase()} discovery detected`,
                    `Finding generated during ${currentState} stage`,
                  ],

                  riskScore,

                  affectedAsset: updatedScan.target,

                  recommendedActions: intelligence.recommendedActions,

                  threatContext: {
                    ...intelligence.threatContext,
                    stage: currentState,
                  },

                  threatNarrative: intelligence.threatNarrative,

                  businessImpact: intelligence.businessImpact,

                  threatActor: intelligence.threatActor,

                  mitreAttack: intelligence.mitreAttack,

                  intelligenceConfidence: intelligence.intelligenceConfidence,

                  executiveRisk: intelligence.executiveRisk,

                  decisionIntelligence: intelligence.decisionIntelligence,

                  prediction,

                  relatedFindings: findingId ? [findingId] : [],
                });
              }

              return null;
            })
            .catch((error) => {
              console.error("Failed to persist finding or alert:", error);
            });
        }

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

      if (scan.status !== currentState && currentState === "initializing") {
        scanEventBus.emitScanStarted(updatedScan);
      }

      if (currentState === "completed") {
        const runtimeProfile =
          updatedScan.runtimeProfile ??
          createMissionProfile({
            scanType: updatedScan.scanType,
            severity: updatedScan.severity,
          });

        const outcome = determineMissionOutcome(runtimeProfile);

        updatedScan.status = outcome;
        updatedScan.currentStage = outcome;
        updatedScan.completedAt = new Date().toISOString();

        if (outcome === "completed") {
          updatedScan.progress = 100;
        }

        updatedScan.live = false;

        if (outcome === "completed") {
          updatedScan.activity = "Scan completed successfully";

          scanEventBus.emitScanCompleted(updatedScan);

          this.synchronizeMission(updatedScan, "completed");

          scanEventBus.emitTelemetry(
            `Operational scan completed for ${updatedScan.target}`,
            {
              scanId: updatedScan.id,
              findings: updatedScan.findingsCount,
            },
          );
        }

        if (outcome === "failed") {
          updatedScan.activity = "Mission failed during execution";

          scanEventBus.emitScanFailed(updatedScan);

          this.synchronizeMission(updatedScan, "failed");

          scanEventBus.emitTelemetry(
            `Mission failed on ${updatedScan.target}`,
            {
              scanId: updatedScan.id,
            },
          );
        }

        if (outcome === "interrupted") {
          updatedScan.activity =
            "Mission interrupted and awaiting operator review";

          this.synchronizeMission(updatedScan, "interrupted");

          scanEventBus.emitTelemetry(
            `Mission interrupted on ${updatedScan.target}`,
            {
              scanId: updatedScan.id,
            },
          );
        }
      }

      if (updatedScan.mongoId) {
        updateScan(updatedScan.mongoId, {
          status: updatedScan.status,

          currentStage: updatedScan.currentStage,

          runtimeState:
            updatedScan.status === "completed" ||
            updatedScan.status === "failed" ||
            updatedScan.status === "cancelled" ||
            updatedScan.status === "interrupted"
              ? "completed"
              : "active",

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

  async synchronizeMission(scan, missionState) {
    if (!scan.missionMongoId) {
      return;
    }

    try {
      await updateMission(scan.missionMongoId, {
        state: missionState,
        progress: missionState === "completed" ? 100 : scan.progress,
      });

      if (scan.missionId) {
        missionStore.updateMission(scan.missionId, {
          state: missionState,
          progress: missionState === "completed" ? 100 : scan.progress,
        });
      }
    } catch (error) {
      console.error("[Mission Sync] Failed to update mission:", error);
    }
  }

  generateFindings(state, runtimeProfile) {
    const multiplier = runtimeProfile?.findingsMultiplier ?? 1;

    switch (state) {
      case "recon":
        return Math.round(this.randomNumber(1, 3) * multiplier);

      case "enumeration":
        return Math.round(this.randomNumber(2, 6) * multiplier);

      case "analysis":
        return Math.round(this.randomNumber(4, 10) * multiplier);

      case "exploitation":
        return Math.round(this.randomNumber(3, 8) * multiplier);

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