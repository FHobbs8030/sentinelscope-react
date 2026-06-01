import scanEventBus from "../runtime/scanEventBus";

import scanRuntimeEngine from "../runtime/scanRuntimeEngine";

import missionStore from "./missionStore";

import { MISSION_STATES } from "./missionStates";

export async function simulateMissionLifecycle(mission) {
  missionStore.updateMission(mission.id, {
    state: MISSION_STATES.RUNNING,
  });

  scanEventBus.emitTelemetry(
    `Mission execution started for ${mission.target}`,
    {
      source: "mission-simulator",
      missionId: mission.id,
    },
  );

  scanRuntimeEngine.addScan({
    target: mission.target,
    type: mission.type,
    profile: mission.profile,
    severity: mission.severity,
    status: "queued",
    activity: "Mission accepted by runtime engine",
  });

  missionStore.updateMission(mission.id, {
    state: MISSION_STATES.COMPLETED,
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
