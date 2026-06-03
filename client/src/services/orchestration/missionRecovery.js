import { enqueueMission } from "./missionQueue";

import { MISSION_STATES } from "./missionStates";

let recoveryCompleted = false;

export function recoverMissions(missions) {
  if (recoveryCompleted) {
    return 0;
  }

  const recoverableStates = new Set([
    MISSION_STATES.QUEUED,
    MISSION_STATES.INITIALIZING,
    MISSION_STATES.RUNNING,
  ]);

  const recoveredMissions = missions.filter((mission) =>
    recoverableStates.has(mission.state),
  );

  recoveredMissions.forEach((mission) => {
    enqueueMission(mission);
  });

  recoveryCompleted = true;

  console.info(
    `[MissionRecovery] Recovered ${recoveredMissions.length} mission(s)`,
  );

  return recoveredMissions.length;
}

export function resetMissionRecovery() {
  recoveryCompleted = false;
}
