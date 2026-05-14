import NetworkOverviewSection from "./components/NetworkOverviewSection";
import ScanOperationsSection from "./components/ScanOperationsSection";

import TerminalPanel from "../../components/dashboard/TerminalPanel/TerminalPanel";

import ActivityFeed from "../../components/ActivityFeed/ActivityFeed";

import { mockTerminalLogs } from "../../data/mockTerminalLogs";

function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <NetworkOverviewSection />

      <ScanOperationsSection />

      <ActivityFeed />

      <TerminalPanel
        title="Network Operations Terminal"
        status="LIVE"
        logs={mockTerminalLogs}
      />
    </div>
  );
}

export default Dashboard;
