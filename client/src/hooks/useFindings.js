import { useEffect, useMemo, useState } from "react";

import { getFindings } from "../services/api/findingsApi";

import {
  calculateSeverityMetrics,
  calculateRiskScore,
} from "../utils/findings/severityMetrics";

export default function useFindings() {
  const [findings, setFindings] = useState([]);

  useEffect(() => {
    async function hydrateFindings() {
      try {
        const data = await getFindings();

        setFindings(data);
      } catch (error) {
        console.error("[useFindings] Failed to hydrate findings", error);
      }
    }

    hydrateFindings();
  }, []);

  const severityMetrics = useMemo(() => {
    return calculateSeverityMetrics(findings);
  }, [findings]);

  const riskScore = useMemo(() => {
    return calculateRiskScore(findings);
  }, [findings]);

  return {
    findings,
    setFindings,
    severityMetrics,
    riskScore,
  };
}
