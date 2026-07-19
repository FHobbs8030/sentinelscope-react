import {
  createMission as createMissionRecord,
  updateMission as updateMissionRecord,
} from "../api/missionsApi";

import missionStore from "./missionStore";

const MISSION_RECONCILE_INTERVAL = 5000;

function getMissionMongoId(response) {
  return response?.data?._id ?? response?._id ?? null;
}

function buildMissionCreatePayload(mission) {
  return {
    clientMissionId: mission.id,
    target: mission.target,
    type: mission.type,
    profile: mission.profile,
    severity: mission.severity,
    state: mission.state,
    progress: mission.progress,
    scanId: mission.scanId ?? null,
    scanMongoId: mission.scanMongoId ?? null,
  };
}

function buildMissionUpdatePayload(mission) {
  return {
    state: mission.state,
    progress: mission.progress,
    scanId: mission.scanId ?? null,
    scanMongoId: mission.scanMongoId ?? null,
  };
}

function missionSnapshotsMatch(left, right) {
  return (
    left.state === right.state &&
    left.progress === right.progress &&
    left.scanId === right.scanId &&
    left.scanMongoId === right.scanMongoId
  );
}

class MissionPersistenceReconciler {
  constructor() {
    this.pendingMissions = new Map();
    this.intervalId = null;
    this.reconciling = false;

    this.handleOnline = () => {
      void this.reconcile();
    };
  }

  track(mission) {
    if (!mission?.id) {
      return;
    }

    this.pendingMissions.set(mission.id, mission);
  }

  async persistCreate(mission) {
    this.track(mission);

    try {
      const response = await createMissionRecord(
        buildMissionCreatePayload(mission),
      );

      const mongoId = getMissionMongoId(response);

      if (!mongoId) {
        throw new Error(
          "Mission persistence response did not include a MongoDB ID",
        );
      }

      mission.mongoId = mongoId;

      missionStore.updateMission(mission.id, {
        mongoId,
      });

      const latestMission =
        missionStore.getMission(mission.id) ?? mission;

      return this.persistLatest(latestMission);
    } catch (error) {
      console.error(
        "[Mission Persistence] Failed to persist mission create",
        error,
      );

      return false;
    }
  }

  async persistLatest(mission) {
    this.track(mission);

    if (!mission.mongoId) {
      return this.persistCreate(mission);
    }

    const persistedSnapshot = buildMissionUpdatePayload(mission);

    try {
      await updateMissionRecord(mission.mongoId, persistedSnapshot);

      const latestMission = missionStore.getMission(mission.id) ?? mission;

      const latestSnapshot = buildMissionUpdatePayload(latestMission);

      if (missionSnapshotsMatch(persistedSnapshot, latestSnapshot)) {
        this.pendingMissions.delete(mission.id);
      }

      return true;
    } catch (error) {
      console.error(
        "[Mission Persistence] Failed to persist latest mission state",
        error,
      );

      return false;
    }
  }

  async reconcile() {
    if (this.reconciling || this.pendingMissions.size === 0) {
      return;
    }

    this.reconciling = true;

    try {
      const pendingEntries = [...this.pendingMissions.entries()];

      for (const [missionId, trackedMission] of pendingEntries) {
        const mission =
          missionStore.getMission(missionId) ?? trackedMission;

        if (!mission.mongoId) {
          await this.persistCreate(mission);

          continue;
        }

        await this.persistLatest(mission);
      }
    } finally {
      this.reconciling = false;
    }
  }

  start() {
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      void this.reconcile();
    }, MISSION_RECONCILE_INTERVAL);

    if (typeof window !== "undefined") {
      window.addEventListener("online", this.handleOnline);
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (typeof window !== "undefined") {
      window.removeEventListener("online", this.handleOnline);
    }
  }
}

const missionPersistenceReconciler =
  new MissionPersistenceReconciler();

export default missionPersistenceReconciler;
