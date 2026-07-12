const DEFAULT_API_BASE_URL = "http://localhost:3001/api";

const configuredApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim();

export const API_BASE_URL = (
  configuredApiBaseUrl || DEFAULT_API_BASE_URL
).replace(/\/+$/, "");

export const buildApiUrl = (path = "") => {
  const normalizedPath = String(path).replace(/^\/+/, "");

  return normalizedPath
    ? `${API_BASE_URL}/${normalizedPath}`
    : API_BASE_URL;
};
