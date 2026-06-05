const API_URL = "http://localhost:3001/api/findings";

export async function createFinding(findingData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(findingData),
  });

  return response.json();
}

export async function getFindings() {
  const response = await fetch(API_URL);

  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.findings)) {
    return data.findings;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  return [];
}

export async function getFindingById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  return response.json();
}

export async function updateFinding(id, updates) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  return response.json();
}
