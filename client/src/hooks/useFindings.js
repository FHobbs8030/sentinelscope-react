import { useEffect, useMemo, useState } from "react";

import { getFindings } from "../services/api/findingsApi";

import {
  calculateSeverityMetrics,
  calculateFindingExposureScore,
} from "../utils/findings/severityMetrics";

export default function useFindings() {
  const [findings, setFindings] = useState([]);

  useEffect(() => {
    async function hydrateFindings() {
      try {
        const data = await getFindings();

        setFindings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("[useFindings] Failed to hydrate findings", error);

        setFindings([]);
      }
    }

    hydrateFindings();
  }, []);

  const severityMetrics = useMemo(() => {
    return calculateSeverityMetrics(findings);
  }, [findings]);

  const findingExposureScore = useMemo(() => {
    return calculateFindingExposureScore(findings);
  }, [findings]);

  return {
    findings,

    setFindings,

    severityMetrics,

    totalFindings: severityMetrics.total,

    findingExposureScore,

  };
}
