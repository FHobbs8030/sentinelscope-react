import { buildApiUrl } from "./apiConfig";

const API_URL = buildApiUrl("missions");

export async function createMission(missionData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(missionData),
  });

  return response.json();
}

export async function getMissions() {
  const response = await fetch(API_URL);

  return response.json();
}

export async function updateMission(id, updates) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  return response.json();
}
