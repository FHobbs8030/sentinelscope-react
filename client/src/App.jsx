import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import AppShell from "./components/layout/AppShell/AppShell";

import Dashboard from "./pages/Dashboard/Dashboard";
import Targets from "./pages/Targets/Targets";

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
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/targets" element={<Targets />} />
      </Routes>
    </AppShell>
  );
}

export default App;
