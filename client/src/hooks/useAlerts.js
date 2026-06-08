import { useCallback, useEffect, useState } from "react";

import { getAlerts } from "../services/api/alertsApi";

export default function useAlerts() {
  const [alerts, setAlerts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const refreshAlerts = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const data = await getAlerts();

      setAlerts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to hydrate alerts:", err);

      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function hydrateAlerts() {
      await refreshAlerts();
    }

    hydrateAlerts();
  }, [refreshAlerts]);

  return {
    alerts,

    loading,

    error,

    refreshAlerts,
  };
}
