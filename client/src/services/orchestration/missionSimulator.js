import scanEventBus from "../runtime/scanEventBus";

import scanRuntimeEngine from "../runtime/scanRuntimeEngine";

export async function simulateMissionLifecycle(mission) {
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

  scanEventBus.emitTelemetry(
    `Mission handed to runtime engine for ${mission.target}`,
    {
      source: "mission-simulator",
      missionId: mission.id,
    },
  );

  return mission;
}
