import { useCallback, useEffect, useMemo, useState } from "react";

import scanService from "../services/scanService";

import scanRuntimeEngine from "../services/runtime/scanRuntimeEngine";

import { TERMINAL_SCAN_STATES } from "../services/runtime/scanStateMachine";

const ACTIVE_SCAN_STATES = [
  "queued",
  "initializing",
  "recon",
  "enumeration",
  "analysis",
  "exploitation",
  "reporting",
];

const useScans = () => {
  const [scans, setScans] = useState([]);

  const [selectedScan, setSelectedScan] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const loadScans = useCallback(async () => {
    try {
      setIsLoading(true);

      setError(null);

      const allScans = await scanService.getScans();

      scanRuntimeEngine.initialize(allScans);

      setScans(scanRuntimeEngine.getScans());

      scanRuntimeEngine.start();
    } catch (err) {
      console.error("Failed to load scans:", err);

      setError("Unable to load scan data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshScans = useCallback(async () => {
    await loadScans();
  }, [loadScans]);

  const selectScanById = useCallback(async (scanId) => {
    try {
      const currentScans = scanRuntimeEngine.getScans();

      const scan = currentScans.find((item) => item.id === scanId) ?? null;

      setSelectedScan(scan);

      return scan;
    } catch (err) {
      console.error("Failed to retrieve scan:", err);

      setError("Unable to retrieve scan details.");

      return null;
    }
  }, []);

  const clearSelectedScan = useCallback(() => {
    setSelectedScan(null);
  }, []);

  const getScansByTarget = useCallback((target) => {
    try {
      const currentScans = scanRuntimeEngine.getScans();

      return currentScans.filter((scan) =>
        scan.target?.toLowerCase().includes(target.toLowerCase()),
      );
    } catch (err) {
      console.error("Failed to retrieve target scans:", err);

      setError("Unable to retrieve target scan data.");

      return [];
    }
  }, []);

  const getScansByType = useCallback((type) => {
    try {
      const currentScans = scanRuntimeEngine.getScans();

      return currentScans.filter(
        (scan) => scan.type?.toLowerCase() === type.toLowerCase(),
      );
    } catch (err) {
      console.error("Failed to retrieve scan type data:", err);

      setError("Unable to retrieve scan type data.");

      return [];
    }
  }, []);

  const addScan = useCallback((scan) => {
    scanRuntimeEngine.addScan(scan);
  }, []);

  const cancelScan = useCallback((scanId) => {
    scanRuntimeEngine.cancelScan(scanId);
  }, []);

  const removeScan = useCallback((scanId) => {
    scanRuntimeEngine.removeScan(scanId);
  }, []);

  const activeScans = useMemo(() => {
    return scans.filter((scan) => ACTIVE_SCAN_STATES.includes(scan.status));
  }, [scans]);

  const completedScans = useMemo(() => {
    return scans.filter((scan) => scan.status === "completed");
  }, [scans]);

  const failedScans = useMemo(() => {
    return scans.filter((scan) => scan.status === "failed");
  }, [scans]);

  const criticalScans = useMemo(() => {
    return scans.filter((scan) => scan.severity?.toLowerCase() === "critical");
  }, [scans]);

  const queuedScans = useMemo(() => {
    return scans.filter((scan) => scan.status === "queued");
  }, [scans]);

  const initializingScans = useMemo(() => {
    return scans.filter((scan) => scan.status === "initializing");
  }, [scans]);

  const runningScans = useMemo(() => {
    return scans.filter(
      (scan) =>
        scan.status !== "queued" &&
        scan.status !== "completed" &&
        scan.status !== "failed" &&
        scan.status !== "cancelled",
    );
  }, [scans]);

  const liveScans = useMemo(() => {
    return scans.filter((scan) => !TERMINAL_SCAN_STATES.includes(scan.status));
  }, [scans]);

  const criticalFindingsCount = useMemo(() => {
    return scans.reduce((total, scan) => {
      if (scan.severity?.toLowerCase() === "critical") {
        return total + (scan.findings ?? 0);
      }

      return total;
    }, 0);
  }, [scans]);

  const metrics = useMemo(() => {
    const totalScans = scans.length;

    const completedCount = completedScans.length;

    const failedCount = failedScans.length;

    const activeCount = activeScans.length;

    const successRate =
      totalScans > 0 ? Math.round((completedCount / totalScans) * 100) : 0;

    const averageFindings =
      totalScans > 0
        ? Math.round(
            scans.reduce((total, scan) => total + (scan.findings ?? 0), 0) /
              totalScans,
          )
        : 0;

    return {
      totalScans,
      activeScans: activeCount,
      completedScans: completedCount,
      failedScans: failedCount,
      successRate,
      criticalFindings: criticalFindingsCount,
      averageFindings,
    };
  }, [scans, activeScans, completedScans, failedScans, criticalFindingsCount]);

  useEffect(() => {
    let mounted = true;

    const initializeScans = async () => {
      if (!mounted) {
        return;
      }

      await loadScans();
    };

    initializeScans();

    return () => {
      mounted = false;
    };
  }, [loadScans]);

  useEffect(() => {
    const unsubscribe = scanRuntimeEngine.subscribe((updatedScans) => {
      setScans(updatedScans);

      setSelectedScan((previousSelectedScan) => {
        if (!previousSelectedScan) {
          return null;
        }

        return (
          updatedScans.find((scan) => scan.id === previousSelectedScan.id) ??
          null
        );
      });
    });

    return () => {
      unsubscribe();

      scanRuntimeEngine.stop();
    };
  }, []);

  return {
    scans,
    activeScans,
    completedScans,
    failedScans,
    criticalScans,
    queuedScans,
    initializingScans,
    runningScans,
    liveScans,
    metrics,
    selectedScan,
    isLoading,
    error,
    refreshScans,
    selectScanById,
    clearSelectedScan,
    getScansByTarget,
    getScansByType,
    addScan,
    cancelScan,
    removeScan,
    criticalFindingsCount,
  };
};

export default useScans;
