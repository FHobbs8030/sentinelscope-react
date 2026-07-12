import "./OperationsSummaryPanel.css";

import useScans from "../../../hooks/useScans";
import useMissions from "../../../hooks/useMissions";
import useFindings from "../../../hooks/useFindings";

function OperationsSummaryPanel() {
  const { metrics } = useScans();

  const { metrics: missionMetrics } = useMissions();

  const { totalFindings } = useFindings();

  const averageFindingsPerScan =
    metrics.totalScans > 0 ? Math.round(totalFindings / metrics.totalScans) : 0;

  const cards = [
    {
      label: "Queued Missions",
      value: missionMetrics.queuedMissions,
      tone: "queued",
    },
    {
      label: "Completed Missions",
      value: missionMetrics.completedMissions,
      tone: "success",
    },
    {
      label: "Failed Missions",
      value: missionMetrics.failedMissions,
      tone: "critical",
    },
    {
      label: "Reports Generated",
      value: metrics.completedScans,
      tone: "info",
    },
    {
      label: "Average Findings",
      value: averageFindingsPerScan,
      tone: "warning",
    },
    {
      label: "Success Rate",
      value: `${metrics.successRate}%`,
      tone: "success",
    },
  ];

  return (
    <section
      className="operations-summary-panel"
      aria-label="Operations summary"
    >
      {cards.map((card) => (
        <article
          key={card.label}
          className={`operations-summary-card operations-summary-card--${card.tone}`}
        >
          <span className="operations-summary-value">{card.value}</span>

          <span className="operations-summary-label">{card.label}</span>
        </article>
      ))}
    </section>
  );
}

export default OperationsSummaryPanel;
