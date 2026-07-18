import { buildApiUrl } from "./apiConfig";

export const DEFAULT_API_TIMEOUT_MS = 30000;

export const API_ERROR_CODES = Object.freeze({
  ABORTED: "ABORTED",
  HTTP_ERROR: "HTTP_ERROR",
  INVALID_JSON: "INVALID_JSON",
  INVALID_RESPONSE: "INVALID_RESPONSE",
  NETWORK_ERROR: "NETWORK_ERROR",
  OFFLINE: "OFFLINE",
  TIMEOUT: "TIMEOUT",
});

export class ApiError extends Error {
  constructor(
    message,
    {
      code = API_ERROR_CODES.NETWORK_ERROR,
      status = null,
      method = null,
      url = null,
      details = null,
      cause = null,
    } = {},
  ) {
    super(message);

    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.method = method;
    this.url = url;
    this.details = details;

    if (cause) {
      this.cause = cause;
    }
  }
}

const isFormData = (value) => {
  return typeof FormData !== "undefined" && value instanceof FormData;
};

const isUrlSearchParams = (value) => {
  return (
    typeof URLSearchParams !== "undefined" &&
    value instanceof URLSearchParams
  );
};

const isJsonContentType = (contentType = "") => {
  const normalizedContentType = contentType.toLowerCase();

  return (
    normalizedContentType.includes("application/json") ||
    normalizedContentType.includes("+json")
  );
};

const prepareRequestBody = (body, headers) => {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (
    typeof body === "string" ||
    isFormData(body) ||
    isUrlSearchParams(body)
  ) {
    return body;
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return JSON.stringify(body);
};

const getServerErrorMessage = (responseData, status) => {
  if (typeof responseData?.message === "string") {
    return responseData.message;
  }

  if (typeof responseData?.error?.message === "string") {
    return responseData.error.message;
  }

  if (typeof responseData?.error === "string") {
    return responseData.error;
  }

  return `SentinelScope API request failed with status ${status}.`;
};

const getServerErrorCode = (responseData) => {
  if (typeof responseData?.code === "string") {
    return responseData.code;
  }

  if (typeof responseData?.error?.code === "string") {
    return responseData.error.code;
  }

  return API_ERROR_CODES.HTTP_ERROR;
};

const parseJsonResponse = async (response, requestMetadata) => {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const responseText = await response.text();

  if (!responseText.trim()) {
    throw new ApiError("SentinelScope API returned an empty response.", {
      code: API_ERROR_CODES.INVALID_RESPONSE,
      status: response.status,
      ...requestMetadata,
    });
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (!isJsonContentType(contentType)) {
    throw new ApiError(
      "SentinelScope API returned an unexpected response format.",
      {
        code: API_ERROR_CODES.INVALID_RESPONSE,
        status: response.status,
        details: {
          contentType: contentType || null,
          responsePreview: responseText.slice(0, 200),
        },
        ...requestMetadata,
      },
    );
  }

  try {
    return JSON.parse(responseText);
  } catch (error) {
    throw new ApiError("SentinelScope API returned invalid JSON.", {
      code: API_ERROR_CODES.INVALID_JSON,
      status: response.status,
      details: {
        contentType,
        responsePreview: responseText.slice(0, 200),
      },
      cause: error,
      ...requestMetadata,
    });
  }
};

export const apiRequest = async (
  path,
  {
    method = "GET",
    headers: providedHeaders,
    body,
    signal,
    timeoutMs = DEFAULT_API_TIMEOUT_MS,
    ...requestOptions
  } = {},
) => {
  const url = buildApiUrl(path);
  const normalizedMethod = method.toUpperCase();
  const requestController = new AbortController();

  let didTimeout = false;

  const timeoutId = setTimeout(() => {
    didTimeout = true;
    requestController.abort();
  }, timeoutMs);

  const abortFromCaller = () => {
    requestController.abort();
  };

  if (signal?.aborted) {
    requestController.abort();
  } else {
    signal?.addEventListener("abort", abortFromCaller, {
      once: true,
    });
  }

  const headers = new Headers(providedHeaders);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const requestBody = prepareRequestBody(body, headers);

  const requestMetadata = {
    method: normalizedMethod,
    url,
  };

  try {
    const response = await fetch(url, {
      ...requestOptions,
      method: normalizedMethod,
      headers,
      body: requestBody,
      signal: requestController.signal,
    });

    const responseData = await parseJsonResponse(response, requestMetadata);

    if (!response.ok) {
      throw new ApiError(
        getServerErrorMessage(responseData, response.status),
        {
          code: getServerErrorCode(responseData),
          status: response.status,
          details: responseData,
          ...requestMetadata,
        },
      );
    }

    return responseData;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (didTimeout) {
      throw new ApiError(
        `SentinelScope API request timed out after ${timeoutMs} milliseconds.`,
        {
          code: API_ERROR_CODES.TIMEOUT,
          cause: error,
          ...requestMetadata,
        },
      );
    }

    if (signal?.aborted || error?.name === "AbortError") {
      throw new ApiError("SentinelScope API request was cancelled.", {
        code: API_ERROR_CODES.ABORTED,
        cause: error,
        ...requestMetadata,
      });
    }

    const isOffline =
      typeof navigator !== "undefined" && navigator.onLine === false;

    if (isOffline) {
      throw new ApiError(
        "The device is offline. Check the network connection and try again.",
        {
          code: API_ERROR_CODES.OFFLINE,
          cause: error,
          ...requestMetadata,
        },
      );
    }

    throw new ApiError("Unable to connect to the SentinelScope API.", {
      code: API_ERROR_CODES.NETWORK_ERROR,
      cause: error,
      ...requestMetadata,
    });
  } finally {
    clearTimeout(timeoutId);

    signal?.removeEventListener("abort", abortFromCaller);
  }
};

export const getApiErrorMessage = (
  error,
  fallbackMessage = "The request could not be completed.",
) => {
  if (!(error instanceof ApiError)) {
    return fallbackMessage;
  }

  switch (error.code) {
    case API_ERROR_CODES.OFFLINE:
      return "You appear to be offline. Check your internet connection and try again.";

    case API_ERROR_CODES.TIMEOUT:
      return "The SentinelScope API did not respond in time. Try again.";

    case API_ERROR_CODES.NETWORK_ERROR:
      return "Unable to reach the SentinelScope API. The backend may be unavailable.";

    case API_ERROR_CODES.ABORTED:
      return "The request was cancelled.";

    case API_ERROR_CODES.INVALID_JSON:
    case API_ERROR_CODES.INVALID_RESPONSE:
      return "The SentinelScope API returned an invalid response.";

    default:
      break;
  }

  if (error.status >= 500) {
    return "The SentinelScope API is temporarily unavailable. Try again.";
  }

  if (error.status === 404) {
    return "The requested SentinelScope resource was not found.";
  }

  if (error.status === 401) {
    return "Authentication is required to complete this request.";
  }

  if (error.status === 403) {
    return "You do not have permission to complete this request.";
  }

  return error.message || fallbackMessage;
};
