import { useEffect, useMemo, useState } from "react";

import missionStore from "../services/orchestration/missionStore";

import { getMissions } from "../services/api/missionsApi";

import { recoverMissions } from "../services/orchestration/missionRecovery";

export default function useMissions() {
  const [missions, setMissions] = useState(missionStore.getMissions());

  useEffect(() => {
    async function hydrateMissions() {
      try {
        const response = await getMissions();

        if (response?.data) {
          missionStore.setMissions(response.data);

          recoverMissions(response.data);
        }
      } catch (error) {
        console.error(
          "[useMissions] Failed to hydrate missions from MongoDB",
          error,
        );
      }
    }

    hydrateMissions();

    const unsubscribe = missionStore.subscribe((updatedMissions) => {
      setMissions(updatedMissions);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const queuedMissions = useMemo(() => {
    return missions.filter((mission) => mission.state === "queued");
  }, [missions]);

  const runningMissions = useMemo(() => {
    return missions.filter(
      (mission) =>
        mission.state === "running" || mission.state === "initializing",
    );
  }, [missions]);

  const completedMissions = useMemo(() => {
    return missions.filter((mission) => mission.state === "completed");
  }, [missions]);

  const failedMissions = useMemo(() => {
    return missions.filter((mission) => mission.state === "failed");
  }, [missions]);

  const metrics = {
    totalMissions: missions.length,
    queuedMissions: queuedMissions.length,
    runningMissions: runningMissions.length,
    completedMissions: completedMissions.length,
    failedMissions: failedMissions.length,
  };

  return {
    missions,
    queuedMissions,
    runningMissions,
    completedMissions,
    failedMissions,
    metrics,
  };
}
