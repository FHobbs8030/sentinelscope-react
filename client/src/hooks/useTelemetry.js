import { useEffect, useState } from "react";

import {
  getTelemetryLogs,
  subscribe,
} from "../services/runtime/telemetry/telemetryStore";

function useTelemetry() {
  const [telemetryLogs, setTelemetryLogs] = useState(() => getTelemetryLogs());

  useEffect(() => {
    const unsubscribeTelemetry = subscribe((logs) => {
      setTelemetryLogs(logs);
    });

    return () => {
      unsubscribeTelemetry();
    };
  }, []);

  return telemetryLogs;
}

export default useTelemetry;
