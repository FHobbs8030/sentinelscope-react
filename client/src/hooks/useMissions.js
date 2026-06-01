import { useEffect, useMemo, useState } from "react";

import missionStore from "../services/orchestration/missionStore";

export default function useMissions() {
  const [missions, setMissions] = useState(missionStore.getMissions());

  useEffect(() => {
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
   return missions.filter((mission) => mission.state === "running");
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
