import "./Dashboard.css";

import KpiSummarySection from "./components/KpiSummarySection";
import MissionQueueSection from "./components/MissionQueueSection";
import NetworkOverviewSection from "./components/NetworkOverviewSection";
import ScanOperationsSection from "./components/ScanOperationsSection";
import FindingsOverviewSection from "./components/FindingsOverviewSection";
import AnalyticsSection from "./components/AnalyticsSection/AnalyticsSection";

import TerminalPanel from "../../components/dashboard/TerminalPanel/TerminalPanel";

import ActivityFeed from "../../components/ActivityFeed";

import useTelemetry from "../../hooks/useTelemetry";

function Dashboard() {
  const telemetryLogs = useTelemetry();

  return (
    <div className="dashboard-shell">
      <div className="dashboard-main">
        <KpiSummarySection />

        <MissionQueueSection />

        <NetworkOverviewSection />

        <ScanOperationsSection />

        <FindingsOverviewSection />

        <AnalyticsSection />

        <TerminalPanel
          title="Network Operations Terminal"
          status="LIVE"
          logs={telemetryLogs}
        />
      </div>

      <ActivityFeed />
    </div>
  );
}

export default Dashboard;
