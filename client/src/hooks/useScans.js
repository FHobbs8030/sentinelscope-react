import { useCallback, useEffect, useMemo, useState } from "react";
import scanService from "../services/scanService";

const useScans = () => {
  const [scans, setScans] = useState([]);

  const [activeScans, setActiveScans] = useState([]);

  const [completedScans, setCompletedScans] = useState([]);

  const [failedScans, setFailedScans] = useState([]);

  const [criticalScans, setCriticalScans] = useState([]);

  const [metrics, setMetrics] = useState(null);

  const [selectedScan, setSelectedScan] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const loadScans = useCallback(async () => {
    try {
      setIsLoading(true);

      setError(null);

      const [allScans, active, completed, failed, critical, scanMetrics] =
        await Promise.all([
          scanService.getScans(),
          scanService.getActiveScans(),
          scanService.getCompletedScans(),
          scanService.getFailedScans(),
          scanService.getCriticalScans(),
          scanService.getScanMetrics(),
        ]);

      setScans(allScans);

      setActiveScans(active);

      setCompletedScans(completed);

      setFailedScans(failed);

      setCriticalScans(critical);

      setMetrics(scanMetrics);
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
      const scan = await scanService.getScanById(scanId);

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

  const getScansByTarget = useCallback(async (target) => {
    try {
      return await scanService.getScansByTarget(target);
    } catch (err) {
      console.error("Failed to retrieve target scans:", err);

      setError("Unable to retrieve target scan data.");

      return [];
    }
  }, []);

  const getScansByType = useCallback(async (type) => {
    try {
      return await scanService.getScansByType(type);
    } catch (err) {
      console.error("Failed to retrieve scan type data:", err);

      setError("Unable to retrieve scan type data.");

      return [];
    }
  }, []);

  const runningScans = useMemo(() => {
    return scans.filter((scan) => scan.status === "Running");
  }, [scans]);

  const queuedScans = useMemo(() => {
    return scans.filter((scan) => scan.status === "Queued");
  }, [scans]);

  const pausedScans = useMemo(() => {
    return scans.filter((scan) => scan.status === "Paused");
  }, [scans]);

  const initializingScans = useMemo(() => {
    return scans.filter((scan) => scan.status === "Initializing");
  }, [scans]);

  const liveScans = useMemo(() => {
    return scans.filter((scan) => scan.live);
  }, [scans]);

  const criticalFindingsCount = useMemo(() => {
    return scans
      .filter((scan) => scan.severity === "Critical")
      .reduce((total, scan) => total + scan.findings, 0);
  }, [scans]);

  useEffect(() => {
    const initializeScans = async () => {
      await loadScans();
    };

    initializeScans();
  }, [loadScans]);

  return {
    scans,
    activeScans,
    completedScans,
    failedScans,
    criticalScans,
    runningScans,
    queuedScans,
    pausedScans,
    initializingScans,
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
    criticalFindingsCount,
  };
};

export default useScans;
