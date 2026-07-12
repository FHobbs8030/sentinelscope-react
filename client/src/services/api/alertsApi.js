import { buildApiUrl } from "./apiConfig";

const API_URL = buildApiUrl("alerts");

export async function createAlert(alertData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alertData),
  });

  return response.json();
}

export async function getAlerts() {
  const response = await fetch(API_URL);

  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.alerts)) {
    return data.alerts;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  return [];
}

export async function getAlertById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  return response.json();
}

export async function updateAlert(id, updates) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  return response.json();
}

export async function acknowledgeAlert(id) {
  const response = await fetch(`${API_URL}/${id}/acknowledge`, {
    method: "PATCH",
  });

  return response.json();
}

export async function investigateAlert(id) {
  const response = await fetch(`${API_URL}/${id}/investigate`, {
    method: "PATCH",
  });

  return response.json();
}

export async function resolveAlert(id) {
  const response = await fetch(`${API_URL}/${id}/resolve`, {
    method: "PATCH",
  });

  return response.json();
}

export async function closeAlert(id) {
  const response = await fetch(`${API_URL}/${id}/close`, {
    method: "PATCH",
  });

  return response.json();
}
