import { enqueueMission } from "./missionQueue";

import { MISSION_STATES } from "./missionStates";

import missionStore from "./missionStore";

import scanEventBus from "../runtime/scanEventBus";

import { createMission as createMissionRecord } from "../api/missionsApi";

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

export async function launchMission({ target, type, profile, severity }) {
  const mission = createMission({
    target,
    type,
    profile,
    severity,
  });

  try {
    const response = await createMissionRecord({
      target,
      type,
      profile,
      severity,
      state: mission.state,
      progress: mission.progress,
    });

    if (response?.data?._id) {
      mission.mongoId = response.data._id;
    }
  } catch (error) {
    console.error("[ReconOrchestrator] Failed to persist mission", error);
  }

  missionStore.addMission(mission);

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
