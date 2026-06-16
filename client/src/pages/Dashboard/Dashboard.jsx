import { useState } from "react";

import "./Dashboard.css";

import KpiSummarySection from "./components/KpiSummarySection";

import OperationalWorkspace from "./components/OperationalWorkspace";
import AnalyticsWorkspace from "./components/AnalyticsWorkspace";

import AlertOperationsSection from "./components/AlertOperationsSection";
import AlertDetailsPanel from "./components/AlertDetailsPanel";
import AlertTimelineViewer from "./components/AlertTimelineViewer";
import AlertIntelligenceDrawer from "./components/AlertIntelligenceDrawer";

import AnalyticsSection from "./components/AnalyticsSection/AnalyticsSection";

import ExecutiveIntelligenceSection from "./components/ExecutiveIntelligenceSection";
import PredictiveIntelligenceSection from "./components/PredictiveIntelligenceSection";
import CorrelationIntelligenceSection from "./components/CorrelationIntelligenceSection";

import TerminalPanel from "../../components/dashboard/TerminalPanel/TerminalPanel";
import ActivityFeed from "../../components/ActivityFeed";

import useTelemetry from "../../hooks/useTelemetry";

function Dashboard() {
  const telemetryLogs = useTelemetry();

  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <div className="dashboard-shell">
      <div className="dashboard-main">
        {/* KPI Workspace */}
        <KpiSummarySection />

        {/* Operations Workspace */}
        <section className="dashboard-zone">
          <OperationalWorkspace />
        </section>

        {/* Analytics Workspace */}
        <section className="dashboard-zone">
          <AnalyticsWorkspace />
        </section>

        {/* Intelligence Workspace */}
        <section className="dashboard-zone">
          <CorrelationIntelligenceSection />

          <ExecutiveIntelligenceSection />

          <PredictiveIntelligenceSection
            alerts={selectedAlert ? [selectedAlert] : []}
          />
        </section>

        {/* Investigation Workspace */}
        <section className="dashboard-zone">
          <AlertOperationsSection
            selectedAlert={selectedAlert}
            onSelectAlert={setSelectedAlert}
          />

          <AlertDetailsPanel alert={selectedAlert} />

          <AlertTimelineViewer alert={selectedAlert} />

          <AlertIntelligenceDrawer alert={selectedAlert} />
        </section>

        {/* Reporting Workspace */}
        <section className="dashboard-zone">
          <AnalyticsSection />
        </section>

        {/* Terminal Workspace */}
        <section className="dashboard-zone">
          <TerminalPanel
            title="Network Operations Terminal"
            status="LIVE"
            logs={telemetryLogs}
          />
        </section>
      </div>

      <ActivityFeed />
    </div>
  );
}

export default Dashboard;
