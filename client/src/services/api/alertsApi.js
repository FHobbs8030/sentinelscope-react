const API_URL = "http://localhost:3001/api/alerts";

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
