import { useEffect } from "react";

import AppShell from "./components/layout/AppShell/AppShell";

import Dashboard from "./pages/Dashboard/Dashboard";

import scanEventBus from "./services/runtime/scanEventBus";

import { initializeTelemetryEmitter } from "./services/runtime/telemetry/telemetryEmitter";

function App() {
  useEffect(() => {
    initializeTelemetryEmitter();

    setTimeout(() => {
      scanEventBus.emit("scan:started", {
        target: "api.twilightparadox.com",
      });
    }, 2000);
  }, []);

  return (
    <AppShell>
      <Dashboard />
    </AppShell>
  );
}

export default App;
