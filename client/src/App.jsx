import { useEffect } from "react";

import AppShell from "./components/layout/AppShell/AppShell";

import Dashboard from "./pages/Dashboard/Dashboard";

import { initializeTelemetryEmitter } from "./services/runtime/telemetry/telemetryEmitter";

import missionQueueManager from "./services/orchestration/missionQueueManager";

function App() {
  useEffect(() => {
    initializeTelemetryEmitter();

    missionQueueManager.start();

    return () => {
      missionQueueManager.stop();
    };
  }, []);

  return (
    <AppShell>
      <Dashboard />
    </AppShell>
  );
}

export default App;
