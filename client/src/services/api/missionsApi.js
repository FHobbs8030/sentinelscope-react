import { apiRequest } from "./apiClient";

const MISSIONS_PATH = "missions";

const buildMissionPath = (id) => {
  return `${MISSIONS_PATH}/${encodeURIComponent(String(id))}`;
};

export async function createMission(missionData, requestOptions = {}) {
  return apiRequest(MISSIONS_PATH, {
    ...requestOptions,
    method: "POST",
    body: missionData,
  });
}

export async function getMissions(requestOptions = {}) {
  return apiRequest(MISSIONS_PATH, requestOptions);
}

export async function updateMission(id, updates, requestOptions = {}) {
  return apiRequest(buildMissionPath(id), {
    ...requestOptions,
    method: "PATCH",
    body: updates,
  });
}
