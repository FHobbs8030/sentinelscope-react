const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:3001/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};

const getScans = async () => {
  const response = await fetch(`${API_BASE_URL}/scans`);

  const result = await handleResponse(response);

  return result.data || [];
};

const getScanById = async (scanId) => {
  const response = await fetch(
    `${API_BASE_URL}/scans/${scanId}`,
  );

  const result = await handleResponse(response);

  return result.data || null;
};

const createScan = async (scanData) => {
  const response = await fetch(`${API_BASE_URL}/scans`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(scanData),
  });

  const result = await handleResponse(response);

  return result.data;
};

const updateScan = async (scanId, updates) => {
  const response = await fetch(
    `${API_BASE_URL}/scans/${scanId}`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updates),
    },
  );

  const result = await handleResponse(response);

  return result.data;
};

const deleteScan = async (scanId) => {
  const response = await fetch(
    `${API_BASE_URL}/scans/${scanId}`,
    {
      method: "DELETE",
    },
  );

  return handleResponse(response);
};

const scanService = {
  getScans,
  getScanById,
  createScan,
  updateScan,
  deleteScan,
};

export default scanService;
