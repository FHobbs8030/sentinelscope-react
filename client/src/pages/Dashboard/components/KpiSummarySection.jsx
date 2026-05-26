import "./KpiSummarySection.css";

import useScans from "../../../hooks/useScans";

function KpiSummarySection() {
  const { metrics } = useScans();

  const kpiSummaryData = [
    {
      id: 1,
      label: "Active Scans",
      value: metrics.activeScans,
      trend: `${metrics.completedScans} completed`,
      status: "positive",
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
      label: "Failed Scans",
      value: metrics.failedScans,
      trend: "Operational runtime failures",
      status: metrics.failedScans > 0 ? "warning" : "positive",
    },

    {
      id: 4,
      label: "Critical Findings",
      value: metrics.criticalFindings,
      trend: "High-priority vulnerabilities",
      status: metrics.criticalFindings > 0 ? "critical" : "positive",
    },

    {
      id: 5,
      label: "Average Findings",
      value: metrics.averageFindings,
      trend: "Per operational scan",
      status: "warning",
    },

    {
      id: 6,
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
