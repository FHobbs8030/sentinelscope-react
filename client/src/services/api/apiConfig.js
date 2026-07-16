const DEVELOPMENT_API_BASE_URL = "http://localhost:3001/api";

const SUPPORTED_PROTOCOLS = new Set(["http:", "https:"]);

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

const getConfiguredApiBaseUrl = () => {
  const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (configuredApiBaseUrl) {
    return configuredApiBaseUrl;
  }

  if (import.meta.env.DEV) {
    return DEVELOPMENT_API_BASE_URL;
  }

  throw new Error(
    "SentinelScope production configuration is missing VITE_API_BASE_URL.",
  );
};

const validateApiBaseUrl = (value) => {
  let parsedUrl;

  try {
    parsedUrl = new URL(value);
  } catch {
    throw new Error("SentinelScope API configuration contains an invalid URL.");
  }

  if (!SUPPORTED_PROTOCOLS.has(parsedUrl.protocol)) {
    throw new Error("SentinelScope API URL must use HTTP or HTTPS.");
  }

  const isLocalApi = LOCAL_HOSTNAMES.has(parsedUrl.hostname);

  if (import.meta.env.PROD && parsedUrl.protocol !== "https:" && !isLocalApi) {
    throw new Error("SentinelScope production API connections must use HTTPS.");
  }

  return parsedUrl.toString().replace(/\/+$/, "");
};

export const API_BASE_URL = validateApiBaseUrl(getConfiguredApiBaseUrl());

export const buildApiUrl = (path = "") => {
  const normalizedPath = String(path).replace(/^\/+/, "");

  return normalizedPath ? `${API_BASE_URL}/${normalizedPath}` : API_BASE_URL;
};
