import { useState } from "react";

import "./Dashboard.css";

import KpiSummarySection from "./components/KpiSummarySection";
import MissionQueueSection from "./components/MissionQueueSection";
import NetworkOverviewSection from "./components/NetworkOverviewSection";
import ScanOperationsSection from "./components/ScanOperationsSection";
import FindingsOverviewSection from "./components/FindingsOverviewSection";
import AlertIntelligenceSection from "./components/AlertIntelligenceSection";
import AlertOperationsSection from "./components/AlertOperationsSection";
import AlertDetailsPanel from "./components/AlertDetailsPanel";
import AlertTimelineViewer from "./components/AlertTimelineViewer";
import AlertIntelligenceDrawer from "./components/AlertIntelligenceDrawer";
import AnalyticsSection from "./components/AnalyticsSection/AnalyticsSection";

import TerminalPanel from "../../components/dashboard/TerminalPanel/TerminalPanel";

import ActivityFeed from "../../components/ActivityFeed";

import useTelemetry from "../../hooks/useTelemetry";

import ExecutiveIntelligenceSection from "./components/ExecutiveIntelligenceSection";

import PredictiveIntelligenceSection from "./components/PredictiveIntelligenceSection";

import CorrelationIntelligenceSection from "./components/CorrelationIntelligenceSection";

function Dashboard() {
  const telemetryLogs = useTelemetry();

  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <div className="dashboard-shell">
      <div className="dashboard-main">
        <KpiSummarySection />

        <MissionQueueSection />

        <NetworkOverviewSection />

        <ScanOperationsSection />

        <FindingsOverviewSection />

        <AlertIntelligenceSection />

        <CorrelationIntelligenceSection />
        
        <ExecutiveIntelligenceSection />

        <PredictiveIntelligenceSection
          alerts={selectedAlert ? [selectedAlert] : []}
        />

        <AlertOperationsSection
          selectedAlert={selectedAlert}
          onSelectAlert={setSelectedAlert}
        />

        <AlertDetailsPanel alert={selectedAlert} />

        <AlertTimelineViewer alert={selectedAlert} />

        <AlertIntelligenceDrawer alert={selectedAlert} />

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
