import "./KpiSummarySection.css";

const kpiSummaryData = [
  {
    id: 1,
    label: "Active Scans",
    value: "12",
    trend: "+2 from yesterday",
    status: "positive",
  },
  {
    id: 2,
    label: "Targets Monitored",
    value: "148",
    trend: "+12 this week",
    status: "positive",
  },
  {
    id: 3,
    label: "Open Findings",
    value: "1,248",
    trend: "+94 this week",
    status: "warning",
  },
  {
    id: 4,
    label: "Critical Risk",
    value: "324",
    trend: "+24 this week",
    status: "critical",
  },
  {
    id: 5,
    label: "Critical Findings",
    value: "27",
    trend: "+6 this week",
    status: "critical",
  },
  {
    id: 6,
    label: "Assets Observed",
    value: "138",
    trend: "+8 this week",
    status: "positive",
  },
];

function KpiSummarySection() {
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
