import { useState } from "react";

import "./Dashboard.css";

import DashboardSectionNav from "./components/DashboardSectionNav";
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

import useTelemetry from "../../hooks/useTelemetry";

function Dashboard() {
  const telemetryLogs = useTelemetry();

  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <div className="dashboard-shell">
      <DashboardSectionNav />

      <div className="dashboard-main">
        {/* KPI Workspace */}
        <section
          id="dashboard-overview"
          className="dashboard-zone dashboard-zone--kpi"
        >
          <KpiSummarySection />
        </section>

        {/* Operations Workspace */}
        <section id="dashboard-operations" className="dashboard-zone">
          <OperationalWorkspace />
        </section>

        {/* Analytics Workspace */}
        <section id="dashboard-analytics" className="dashboard-zone">
          <AnalyticsWorkspace />
        </section>

        {/* Intelligence Workspace */}
        <section id="dashboard-executive" className="dashboard-zone">
          <ExecutiveIntelligenceSection />

          <PredictiveIntelligenceSection
            alerts={selectedAlert ? [selectedAlert] : []}
          />

          <CorrelationIntelligenceSection />
        </section>

        {/* Investigation Workspace */}
        <section id="dashboard-alerts" className="dashboard-zone">
          <AlertOperationsSection
            selectedAlert={selectedAlert}
            onSelectAlert={setSelectedAlert}
          />

          <AlertDetailsPanel alert={selectedAlert} />

          <AlertTimelineViewer alert={selectedAlert} />

          <AlertIntelligenceDrawer alert={selectedAlert} />
        </section>

        {/* Reporting Workspace */}
        <section id="dashboard-reports" className="dashboard-zone">
          <AnalyticsSection />
        </section>

        {/* Terminal Workspace */}
        <section id="dashboard-terminal" className="dashboard-zone">
          <TerminalPanel
            title="Network Operations Terminal"
            status="LIVE"
            logs={telemetryLogs}
          />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
