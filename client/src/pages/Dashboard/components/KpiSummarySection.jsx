import "./KpiSummarySection.css";

import useScans from "../../../hooks/useScans";
import useMissions from "../../../hooks/useMissions";
import useFindings from "../../../hooks/useFindings";

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
    },

    {
      id: 8,
      label: "Queued Missions",
      value: missionMetrics.queuedMissions,
      trend: "Awaiting execution",
      status: missionMetrics.queuedMissions > 0 ? "warning" : "positive",
    },

    {
      id: 9,
      label: "Running Missions",
      value: missionMetrics.runningMissions,
      trend: "Currently executing",
      status: missionMetrics.runningMissions > 0 ? "warning" : "positive",
    },

    {
      id: 10,
      label: "Completed Missions",
      value: missionMetrics.completedMissions,
      trend: "Successfully orchestrated",
      status: "positive",
    },

    {
      id: 11,
      label: "Failed Missions",
      value: missionMetrics.failedMissions,
      trend: "Require investigation",
      status: missionMetrics.failedMissions > 0 ? "critical" : "positive",
    },

    {
      id: 2,
      label: "Total Scans",
      value: metrics.totalScans,
      trend: `${metrics.successRate}% success rate`,
      status: "positive",
    },

    {
      id: 3,
      label: "Interrupted Scans",
      value: metrics.interruptedScans,
      trend: "Recovered after refresh",
      status: metrics.interruptedScans > 0 ? "warning" : "positive",
    },

    {
      id: 4,
      label: "Failed Scans",
      value: metrics.failedScans,
      trend: "Operational runtime failures",
      status: metrics.failedScans > 0 ? "warning" : "positive",
    },

    {
      id: 5,
      label: "Critical Findings",
      value: severityMetrics.critical,
      trend: "High-priority vulnerabilities",
      status: severityMetrics.critical > 0 ? "critical" : "positive",
    },

    {
      id: 6,
      label: "Average Findings",
      value: averageFindingsPerScan,
      trend: "Per persisted scan",
      status: "warning",
    },

    {
      id: 7,
      label: "Completed Scans",
      value: metrics.completedScans,
      trend: "Successfully processed",
      status: "positive",
    },
  ];

  return (
    <section className="kpi-summary-section">
      {kpiSummaryData.map((item) => (
        <article
          className={`kpi-summary-card kpi-summary-card--${item.status}`}
          key={item.id}
        >
          <div className="kpi-summary-card__header">
            <span className="kpi-summary-card__label">{item.label}</span>

            <span className="kpi-summary-card__indicator" />
          </div>

          <strong className="kpi-summary-card__value">{item.value}</strong>

          <span className="kpi-summary-card__trend">{item.trend}</span>
        </article>
      ))}
    </section>
  );
}

export default KpiSummarySection;
