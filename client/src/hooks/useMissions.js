import { useEffect, useMemo, useState } from "react";

import { API_ERROR_CODES, ApiError } from "../services/api/apiClient";

import { getMissions } from "../services/api/missionsApi";

import { recoverMissions } from "../services/orchestration/missionRecovery";

import missionStore from "../services/orchestration/missionStore";

const normalizeMissionCollection = (responseData) => {
  const missionData = Array.isArray(responseData)
    ? responseData
    : responseData?.data;

  if (!Array.isArray(missionData)) {
    throw new ApiError(
      "SentinelScope API returned an invalid mission collection.",
      {
        code: API_ERROR_CODES.INVALID_RESPONSE,
        details: responseData,
      },
    );
  }

  return missionData.map((mission) => {
    const mongoId = mission.mongoId ?? mission._id ?? null;

    return {
      ...mission,
      id: mission.id ?? mongoId,
      mongoId,
    };
  });
};

export default function useMissions() {
  const [missions, setMissions] = useState(missionStore.getMissions());

  useEffect(() => {
    const requestController = new AbortController();

    async function hydrateMissions() {
      try {
        const response = await getMissions({
          signal: requestController.signal,
        });

        if (requestController.signal.aborted) {
          return;
        }

        const normalizedMissions = normalizeMissionCollection(response);

        missionStore.setMissions(normalizedMissions);

        recoverMissions(normalizedMissions);
      } catch (error) {
        if (requestController.signal.aborted) {
          return;
        }

        console.error(
          "[useMissions] Failed to hydrate missions from MongoDB",
          error,
        );
      }
    }

    const unsubscribe = missionStore.subscribe((updatedMissions) => {
      setMissions(updatedMissions);
    });

    void hydrateMissions();

    return () => {
      requestController.abort();
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

  const metrics = useMemo(() => {
    return {
      totalMissions: missions.length,
      queuedMissions: queuedMissions.length,
      runningMissions: runningMissions.length,
      completedMissions: completedMissions.length,
      failedMissions: failedMissions.length,
    };
  }, [
    missions.length,
    queuedMissions.length,
    runningMissions.length,
    completedMissions.length,
    failedMissions.length,
  ]);

  return {
    missions,
    queuedMissions,
    runningMissions,
    completedMissions,
    failedMissions,
    metrics,
  };
}
