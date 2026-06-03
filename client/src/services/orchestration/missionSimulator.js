import scanEventBus from "../runtime/scanEventBus";

import scanRuntimeEngine from "../runtime/scanRuntimeEngine";

import missionStore from "./missionStore";

import { MISSION_STATES } from "./missionStates";

import { updateMission as updateMissionRecord } from "../api/missionsApi";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function synchronizeMission(mission, updates) {
  missionStore.updateMission(mission.id, updates);

  Object.assign(mission, updates);

  if (!mission.mongoId) {
    return;
  }

  try {
    await updateMissionRecord(mission.mongoId, updates);
  } catch (error) {
    console.error(
      "[MissionSimulator] Failed to synchronize mission state",
      error,
    );
  }
}

export async function simulateMissionLifecycle(mission) {
  await synchronizeMission(mission, {
    state: MISSION_STATES.INITIALIZING,
    progress: 10,
  });

  scanEventBus.emitTelemetry(`Mission initializing for ${mission.target}`, {
    source: "mission-simulator",
    missionId: mission.id,
  });

  await delay(5000);

  await synchronizeMission(mission, {
    state: MISSION_STATES.RUNNING,
    progress: 50,
  });

  scanEventBus.emitTelemetry(
    `Mission execution started for ${mission.target}`,
    {
      source: "mission-simulator",
      missionId: mission.id,
    },
  );

  scanRuntimeEngine.addScan({
    missionId: mission.id,

    missionMongoId: mission.mongoId ?? null,

    target: mission.target,

    type: mission.type,

    profile: mission.profile,

    severity: mission.severity,

    status: "queued",

    activity: "Mission accepted by runtime engine",
  });

  await delay(15000);

  await synchronizeMission(mission, {
    state: MISSION_STATES.COMPLETED,
    progress: 100,
  });

  scanEventBus.emitTelemetry(
    `Mission handed to runtime engine for ${mission.target}`,
    {
      source: "mission-simulator",
      missionId: mission.id,
    },
  );

  return mission;
}
