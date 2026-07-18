import { API_ERROR_CODES, ApiError, apiRequest } from "./apiClient";

const SCANS_PATH = "scans";

const buildScanPath = (id) => {
  return `${SCANS_PATH}/${encodeURIComponent(String(id))}`;
};

const normalizeScanCollection = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.scans)) {
    return responseData.scans;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  throw new ApiError("SentinelScope API returned an invalid scan collection.", {
    code: API_ERROR_CODES.INVALID_RESPONSE,
    details: responseData,
  });
};

export async function createScan(scanData, requestOptions = {}) {
  return apiRequest(SCANS_PATH, {
    ...requestOptions,
    method: "POST",
    body: scanData,
  });
}

export async function updateScan(id, updates, requestOptions = {}) {
  return apiRequest(buildScanPath(id), {
    ...requestOptions,
    method: "PATCH",
    body: updates,
  });
}

export async function getScans(requestOptions = {}) {
  const responseData = await apiRequest(SCANS_PATH, requestOptions);

  return normalizeScanCollection(responseData);
}
