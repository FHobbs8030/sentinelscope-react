import { useCallback, useEffect, useState } from "react";

import {
  getAlerts,
  acknowledgeAlert,
  investigateAlert,
  resolveAlert,
  closeAlert,
} from "../services/api/alertsApi";

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

  const acknowledge = useCallback(
    async (alertId) => {
      await acknowledgeAlert(alertId);

      await refreshAlerts();
    },
    [refreshAlerts],
  );

  const investigate = useCallback(
    async (alertId) => {
      await investigateAlert(alertId);

      await refreshAlerts();
    },
    [refreshAlerts],
  );

  const resolve = useCallback(
    async (alertId) => {
      await resolveAlert(alertId);

      await refreshAlerts();
    },
    [refreshAlerts],
  );

  const close = useCallback(
    async (alertId) => {
      await closeAlert(alertId);

      await refreshAlerts();
    },
    [refreshAlerts],
  );

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

    acknowledge,

    investigate,

    resolve,

    close,
  };
}
