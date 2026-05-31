import { enqueueMission } from "./missionQueue";

import { MISSION_STATES } from "./missionStates";

import scanEventBus from "../runtime/scanEventBus";

export function createMission(type, target) {
  return {
    id: crypto.randomUUID(),

    type,

    target,

    state: MISSION_STATES.QUEUED,

    progress: 0,

    createdAt: new Date().toISOString(),
  };
}

export function launchMission(type, target) {
  const mission = createMission(type, target);

  enqueueMission(mission);

  scanEventBus.emitTelemetry(`Recon mission queued for ${target}`, {
    source: "recon-orchestrator",
    missionId: mission.id,
    missionType: type,
  });

  return mission;
}
