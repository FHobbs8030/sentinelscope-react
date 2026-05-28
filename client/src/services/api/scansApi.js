const API_URL = "http://localhost:3001/api/scans";

export async function createScan(scanData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scanData),
  });

  return response.json();
}

export async function updateScan(id, updates) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  return response.json();
}
