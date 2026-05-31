import scanEventBus from "../runtime/scanEventBus";

export async function simulateMissionLifecycle(mission) {
  scanEventBus.emitTelemetry(
    `Mission simulator started for ${mission.target}`,
    {
      source: "mission-simulator",
      missionId: mission.id,
    },
  );

  return mission;
}
