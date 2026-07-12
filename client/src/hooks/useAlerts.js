import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getAlerts,
  acknowledgeAlert,
  investigateAlert,
  resolveAlert,
  closeAlert,
} from "../services/api/alertsApi";

import { generateCorrelationAssessment } from "../services/intelligence/correlationEngine";

import {
  calculateAlertMetrics,
  calculateAlertRiskScore,
} from "../utils/alertMetrics";

export default function useAlerts() {
  const [alerts, setAlerts] = useState([]);

  const [campaignAssessment, setCampaignAssessment] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const refreshAlerts = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const data = await getAlerts();

      const alertData = Array.isArray(data) ? data : [];

      setAlerts(alertData);

      const assessment = generateCorrelationAssessment(alertData);

      setCampaignAssessment(assessment);
    } catch (err) {
      console.error("Failed to hydrate alerts:", err);

      setError(err);

      setAlerts([]);
      setCampaignAssessment(null);
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

  const metrics = useMemo(() => {
    return calculateAlertMetrics(alerts);
  }, [alerts]);

  const alertRiskScore = useMemo(() => {
    return calculateAlertRiskScore(alerts);
  }, [alerts]);

  useEffect(() => {
    let isCancelled = false;

    async function hydrateAlerts() {
      try {
        const data = await getAlerts();

        if (isCancelled) {
          return;
        }

        const alertData = Array.isArray(data) ? data : [];

        setAlerts(alertData);

        setCampaignAssessment(generateCorrelationAssessment(alertData));

        setError(null);
      } catch (err) {
        if (isCancelled) {
          return;
        }

        console.error("Failed to hydrate alerts:", err);

        setError(err);

        setAlerts([]);

        setCampaignAssessment(null);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    void hydrateAlerts();

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    alerts,

    metrics,

    alertRiskScore,

    campaignAssessment,

    loading,

    error,

    refreshAlerts,

    acknowledge,

    investigate,

    resolve,

    close,
  };
}
