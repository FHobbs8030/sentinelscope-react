import "./KpiSummarySection.css";

import useScans from "../../../hooks/useScans";
import useMissions from "../../../hooks/useMissions";
import useFindings from "../../../hooks/useFindings";

import {
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

  /* =========================================
   EXECUTIVE RISK
========================================= */

  const executiveRiskScore = Math.min(
    100,
    severityMetrics.critical * 10 +
      severityMetrics.high * 5 +
      severityMetrics.medium * 2,
  );

  const executiveRiskLevel =
    executiveRiskScore >= 80
      ? "HIGH"
      : executiveRiskScore >= 50
        ? "ELEVATED"
        : executiveRiskScore >= 20
          ? "GUARDED"
          : "NORMAL";

  /* =========================================
   INTELLIGENCE METRICS
========================================= */

  const attackSurfaceScore = Math.min(
    100,
    Math.round((findings.length * 4) / 40),
  );

  const threatCoverage = Math.min(
    100,
    Math.round((findings.length / Math.max(metrics.totalScans, 1)) * 10),
  );

  const activeAlerts =
    severityMetrics.critical + severityMetrics.high + severityMetrics.medium;

  const executiveKpis = [
    {
      id: 100,
      label: "RISK SCORE",
      value: executiveRiskScore,
      trend: executiveRiskLevel,
      status:
        executiveRiskScore >= 80
          ? "critical"
          : executiveRiskScore >= 50
            ? "warning"
            : "positive",
      icon: Shield,
      color:
        executiveRiskScore >= 80
          ? "red"
          : executiveRiskScore >= 50
            ? "orange"
            : "green",
    },

    {
      id: 5,
      label: "CRITICAL FINDINGS",
      value: severityMetrics.critical,
      trend: "PRIORITY THREATS",
      status: severityMetrics.critical > 0 ? "critical" : "positive",
      icon: AlertTriangle,
      color: "red",
    },

    {
      id: 15,
      label: "THREAT COVERAGE",
      value: `${threatCoverage}%`,
      trend: "ASSESSMENT INDEX",
      status: "warning",
      icon: Shield,
      color: "purple",
    },

    {
      id: 13,
      label: "ACTIVE ALERTS",
      value: activeAlerts,
      trend: "REQUIRES REVIEW",
      status:
        activeAlerts > 20
          ? "critical"
          : activeAlerts > 5
            ? "warning"
            : "positive",
      icon: Bell,
      color: activeAlerts > 20 ? "red" : activeAlerts > 5 ? "orange" : "green",
    },

    {
      id: 14,
      label: "ATTACK SURFACE",
      value: attackSurfaceScore,
      trend: "EXPOSURE INDEX",
      status:
        attackSurfaceScore > 75
          ? "critical"
          : attackSurfaceScore > 40
            ? "warning"
            : "positive",
      icon: Network,
      color:
        attackSurfaceScore > 75
          ? "red"
          : attackSurfaceScore > 40
            ? "orange"
            : "green",
    },

    {
      id: 9,
      label: "RUNNING MISSIONS",
      value: missionMetrics.runningMissions,
      trend: "EXECUTING NOW",
      status: missionMetrics.runningMissions > 0 ? "warning" : "positive",
      icon: Flag,
      color: "blue",
    },
  ];

  /* =========================================
   V2.8 OPERATIONS SUMMARY PANEL

   These KPIs have been intentionally
   removed from the executive ribbon.

   Planned destination:
   - Operations Summary Panel
   - Mission Analytics Panel
   - Workspace Telemetry

========================================= */

  // eslint-disable-next-line no-unused-vars
  const operationalKpis = [
    {
      id: 8,
      label: "QUEUED MISSIONS",
      value: missionMetrics.queuedMissions,
      trend: "AWAITING EXECUTION",
      status: missionMetrics.queuedMissions > 0 ? "warning" : "positive",
      icon: Clock3,
      color: "orange",
    },

    {
      id: 10,
      label: "COMPLETED MISSIONS",
      value: missionMetrics.completedMissions,
      trend: "SUCCESSFUL",
      status: "positive",
      icon: CheckCircle2,
      color: "green",
    },

    {
      id: 11,
      label: "FAILED MISSIONS",
      value: missionMetrics.failedMissions,
      trend: "INVESTIGATE",
      status: missionMetrics.failedMissions > 0 ? "critical" : "positive",
      icon: XCircle,
      color: "red",
    },

    {
      id: 16,
      label: "REPORTS GENERATED",
      value: metrics.completedScans,
      trend: "EXECUTIVE REPORTS",
      status: "positive",
      icon: FileText,
      color: "cyan",
    },

    {
      id: 2,
      label: "TOTAL SCANS",
      value: metrics.totalScans,
      trend: `${metrics.successRate}% SUCCESS`,
      status: "positive",
      icon: Activity,
      color: "cyan",
    },

    {
      id: 6,
      label: "AVG FINDINGS",
      value: averageFindingsPerScan,
      trend: "PER SCAN",
      status: "warning",
      icon: Shield,
      color: "orange",
    },

    {
      id: 3,
      label: "INTERRUPTED SCANS",
      value: metrics.interruptedScans,
      trend: "RECOVERABLE",
      status: metrics.interruptedScans > 0 ? "warning" : "positive",
      icon: AlertTriangle,
      color: "orange",
    },

    {
      id: 4,
      label: "FAILED SCANS",
      value: metrics.failedScans,
      trend: "RUNTIME FAILURES",
      status: metrics.failedScans > 0 ? "critical" : "positive",
      icon: XCircle,
      color: "red",
    },

    {
      id: 7,
      label: "COMPLETED SCANS",
      value: metrics.completedScans,
      trend: "PROCESSED",
      status: "positive",
      icon: CheckCircle2,
      color: "green",
    },
  ];

  return (
    <section className="kpi-summary-section">
      <div className="kpi-summary-track">
        {executiveKpis.map((item) => (
          <article
            key={item.id}
            className={`kpi-summary-card kpi-summary-card--${item.status}`}
          >
            <div className="kpi-summary-card__top">
              <strong className="kpi-summary-card__value">{item.value}</strong>

              <div
                className={`kpi-summary-card__icon kpi-summary-card__icon--${item.color}`}
              >
                <item.icon size={14} />
              </div>
            </div>

            <span className="kpi-summary-card__label">{item.label}</span>

            <span
              className={`kpi-summary-card__trend kpi-summary-card__trend--${item.status}`}
            >
              {item.trend}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default KpiSummarySection;
