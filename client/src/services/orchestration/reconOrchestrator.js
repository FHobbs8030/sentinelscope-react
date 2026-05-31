import { enqueueMission } from "./missionQueue";

import { MISSION_STATES } from "./missionStates";

import scanEventBus from "../runtime/scanEventBus";

export function createMission({ target, type, profile, severity }) {
  return {
    id: crypto.randomUUID(),

    target,

    type,

    profile,

    severity,

    state: MISSION_STATES.QUEUED,

    progress: 0,

    createdAt: new Date().toISOString(),
  };
}

export function launchMission({ target, type, profile, severity }) {
  const mission = createMission({
    target,
    type,
    profile,
    severity,
  });

  enqueueMission(mission);

  scanEventBus.emitTelemetry(`Recon mission queued for ${target}`, {
    source: "recon-orchestrator",
    missionId: mission.id,
    missionType: type,
    profile,
    severity,
  });

  return mission;
}
