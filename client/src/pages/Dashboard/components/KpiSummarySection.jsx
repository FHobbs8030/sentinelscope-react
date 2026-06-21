import "./KpiSummarySection.css";

import useScans from "../../../hooks/useScans";
import useMissions from "../../../hooks/useMissions";
import useFindings from "../../../hooks/useFindings";
import {
  Radar,
  Target,
  Flag,
  Network,
  Shield,
  AlertTriangle,
  Bell,
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  Activity,
} from "lucide-react";

function KpiSummarySection() {
  const { metrics } = useScans();

  const { metrics: missionMetrics } = useMissions();

  const { findings, severityMetrics } = useFindings();

  const averageFindingsPerScan =
    metrics.totalScans > 0
      ? Math.round(findings.length / metrics.totalScans)
      : 0;

  const kpiSummaryData = [
    {
      id: 1,
      label: "Active Scans",
      value: metrics.activeScans,
      trend: `${metrics.completedScans} completed`,
      status: "positive",
      icon: Radar,
      color: "blue",
    },

    {
      id: 12,
      label: "Targets Monitored",
      value: metrics.totalScans,
      trend: "Active attack surface",
      status: "positive",
      icon: Target,
      color: "green",
    },

    {
      id: 9,
      label: "Running Missions",
      value: missionMetrics.runningMissions,
      trend: "Currently executing",
      status: missionMetrics.runningMissions > 0 ? "warning" : "positive",
      icon: Flag,
      color: "blue",
    },

    {
      id: 14,
      label: "Open Ports Found",
      value: findings.length * 4,
      trend: "Discovered services",
      status: "warning",
      icon: Network,
      color: "orange",
    },

    {
      id: 15,
      label: "Findings Found",
      value: findings.length,
      trend: "Threat intelligence generated",
      status: "warning",
      icon: Shield,
      color: "purple",
    },

    {
      id: 5,
      label: "Critical Findings",
      value: severityMetrics.critical,
      trend: "High-priority vulnerabilities",
      status: severityMetrics.critical > 0 ? "critical" : "positive",
      icon: AlertTriangle,
      color: "red",
    },

    {
      id: 13,
      label: "Alerts Generated",
      value: findings.length,
      trend: "Intelligence events",
      status: "warning",
      icon: Bell,
      color: "red",
    },

    {
      id: 16,
      label: "Reports Generated",
      value: metrics.completedScans,
      trend: "Executive reports",
      status: "positive",
      icon: FileText,
      color: "cyan",
    },

    {
      id: 8,
      label: "Queued Missions",
      value: missionMetrics.queuedMissions,
      trend: "Awaiting execution",
      status: missionMetrics.queuedMissions > 0 ? "warning" : "positive",
      icon: Clock3,
      color: "orange",
    },

    {
      id: 10,
      label: "Completed Missions",
      value: missionMetrics.completedMissions,
      trend: "Successfully orchestrated",
      status: "positive",
      icon: CheckCircle2,
      color: "green",
    },

    {
      id: 11,
      label: "Failed Missions",
      value: missionMetrics.failedMissions,
      trend: "Require investigation",
      status: missionMetrics.failedMissions > 0 ? "critical" : "positive",
      icon: XCircle,
      color: "red",
    },

    {
      id: 2,
      label: "Total Scans",
      value: metrics.totalScans,
      trend: `${metrics.successRate}% success rate`,
      status: "positive",
      icon: Activity,
      color: "cyan",
    },

    {
      id: 3,
      label: "Interrupted Scans",
      value: metrics.interruptedScans,
      trend: "Recovered after refresh",
      status: metrics.interruptedScans > 0 ? "warning" : "positive",
      icon: AlertTriangle,
      color: "orange",
    },

    {
      id: 4,
      label: "Failed Scans",
      value: metrics.failedScans,
      trend: "Operational runtime failures",
      status: metrics.failedScans > 0 ? "warning" : "positive",
      icon: XCircle,
      color: "red",
    },

    {
      id: 6,
      label: "Average Findings",
      value: averageFindingsPerScan,
      trend: "Per persisted scan",
      status: "warning",
      icon: Shield,
      color: "orange",
    },

    {
      id: 7,
      label: "Completed Scans",
      value: metrics.completedScans,
      trend: "Successfully processed",
      status: "positive",
      icon: CheckCircle2,
      color: "green",
    },
  ];

  return (
    <section className="kpi-summary-section">
      <div className="kpi-summary-track">
        {[...kpiSummaryData, ...kpiSummaryData].map((item, index) => (
          <article
            key={`${item.id}-${index}`}
            className={`kpi-summary-card kpi-summary-card--${item.status}`}
          >
            <div className="kpi-summary-card__icon-wrapper">
              <div
                className={`kpi-summary-card__icon kpi-summary-card__icon--${item.color}`}
              >
                <item.icon size={20} />
              </div>
            </div>

            <span className="kpi-summary-card__label">{item.label}</span>

            <div className="kpi-summary-card__content">
              <strong className="kpi-summary-card__value">{item.value}</strong>

              <span className="kpi-summary-card__trend">{item.trend}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default KpiSummarySection;