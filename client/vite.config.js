import { fileURLToPath } from "node:url";

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const PROJECT_ROOT = fileURLToPath(new URL(".", import.meta.url));

const SUPPORTED_PROTOCOLS = new Set(["http:", "https:"]);

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

const validateApiBaseUrl = (value, mode) => {
  const apiBaseUrl = value?.trim();

  if (!apiBaseUrl) {
    if (mode === "production") {
      throw new Error(
        [
          "Missing required environment variable:",
          "VITE_API_BASE_URL.",
          "Add it to the deployment environment before building SentinelScope.",
        ].join(" "),
      );
    }

    return;
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(apiBaseUrl);
  } catch {
    throw new Error("VITE_API_BASE_URL must be a valid absolute URL.");
  }

  if (!SUPPORTED_PROTOCOLS.has(parsedUrl.protocol)) {
    throw new Error("VITE_API_BASE_URL must use the http or https protocol.");
  }

  const isLocalApi = LOCAL_HOSTNAMES.has(parsedUrl.hostname);

  if (mode === "production" && parsedUrl.protocol !== "https:" && !isLocalApi) {
    throw new Error("Production VITE_API_BASE_URL must use HTTPS.");
  }
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, PROJECT_ROOT);

  validateApiBaseUrl(env.VITE_API_BASE_URL, mode);

  return {
    plugins: [react()],

    server: {
      open: true,
    },
  };
});
