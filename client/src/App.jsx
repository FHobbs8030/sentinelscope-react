import { useEffect } from "react";

import AppShell from "./components/layout/AppShell/AppShell";

import Dashboard from "./pages/Dashboard/Dashboard";

import { initializeTelemetryEmitter } from "./services/runtime/telemetry/telemetryEmitter";

function App() {
  useEffect(() => {
    initializeTelemetryEmitter();
  }, []);

  return (
    <AppShell>
      <Dashboard />
    </AppShell>
  );
}

export default App;
