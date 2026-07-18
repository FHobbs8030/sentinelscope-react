import { API_ERROR_CODES, ApiError, apiRequest } from "./apiClient";

const FINDINGS_PATH = "findings";

const buildFindingPath = (id) => {
  return `${FINDINGS_PATH}/${encodeURIComponent(String(id))}`;
};

const normalizeFindingCollection = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.findings)) {
    return responseData.findings;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  throw new ApiError(
    "SentinelScope API returned an invalid finding collection.",
    {
      code: API_ERROR_CODES.INVALID_RESPONSE,
      details: responseData,
    },
  );
};

export async function createFinding(findingData, requestOptions = {}) {
  return apiRequest(FINDINGS_PATH, {
    ...requestOptions,
    method: "POST",
    body: findingData,
  });
}

export async function getFindings(requestOptions = {}) {
  const responseData = await apiRequest(FINDINGS_PATH, requestOptions);

  return normalizeFindingCollection(responseData);
}

export async function getFindingById(id, requestOptions = {}) {
  return apiRequest(buildFindingPath(id), requestOptions);
}

export async function updateFinding(id, updates, requestOptions = {}) {
  return apiRequest(buildFindingPath(id), {
    ...requestOptions,
    method: "PATCH",
    body: updates,
  });
}
