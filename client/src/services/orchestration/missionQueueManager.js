import { dequeueMission } from "./missionQueue";

import { simulateMissionLifecycle } from "./missionSimulator";

import scanEventBus from "../runtime/scanEventBus";

const PROCESS_INTERVAL = 3000;

class MissionQueueManager {
  constructor() {
    this.processing = false;

    this.intervalId = null;
  }

  start() {
    if (this.processing) {
      return;
    }

    this.processing = true;

    scanEventBus.emitTelemetry("Mission queue manager started", {
      source: "mission-queue-manager",
    });

    this.intervalId = setInterval(() => {
      this.processNextMission();
    }, PROCESS_INTERVAL);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);

      this.intervalId = null;
    }

    this.processing = false;
  }

  async processNextMission() {
    const mission = dequeueMission();

    if (!mission) {
      return;
    }

    await simulateMissionLifecycle(mission);
  }
}

const missionQueueManager = new MissionQueueManager();

export default missionQueueManager;
