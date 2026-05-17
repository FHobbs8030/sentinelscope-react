import "./Dashboard.css";

import KpiSummarySection from "./components/KpiSummarySection";
import NetworkOverviewSection from "./components/NetworkOverviewSection";
import ScanOperationsSection from "./components/ScanOperationsSection";

import TerminalPanel from "../../components/dashboard/TerminalPanel/TerminalPanel";

import ActivityFeed from "../../components/ActivityFeed";

import { mockTerminalLogs } from "../../data/mockTerminalLogs";

function Dashboard() {
  return (
    <div className="dashboard-shell">
      <div className="dashboard-main">
        <KpiSummarySection />

        <NetworkOverviewSection />

        <ScanOperationsSection />

        <TerminalPanel
          title="Network Operations Terminal"
          status="LIVE"
          logs={mockTerminalLogs}
        />
      </div>

      <ActivityFeed />
    </div>
  );
}

export default Dashboard;
