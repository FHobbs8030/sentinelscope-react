import scanEventBus from "../runtime/scanEventBus";

export async function simulateMissionLifecycle(mission) {
  scanEventBus.emitTelemetry(
    `Mission execution started for ${mission.target}`,
    {
      source: "mission-simulator",
      missionId: mission.id,
    },
  );

  setTimeout(() => {
    scanEventBus.emitTelemetry(`Mission completed for ${mission.target}`, {
      source: "mission-simulator",
      missionId: mission.id,
    });
  }, 5000);

  return mission;
}
