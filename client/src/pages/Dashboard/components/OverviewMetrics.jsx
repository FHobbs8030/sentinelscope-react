import DashboardGrid from "../../../components/dashboard/DashboardGrid/DashboardGrid";
import StatCard from "../../../components/dashboard/StatCard/StatCard";

function OverviewMetrics() {
  return (
    <DashboardGrid columns={4}>
      <StatCard
        title="Active Hosts"
        value="148"
        trend={12}
        trendLabel="vs last scan"
        status={{
          label: "Online",
          variant: "success",
        }}
      />

      <StatCard
        title="Open Ports"
        value="326"
        trend={4}
        trendLabel="new detections"
        status={{
          label: "Monitoring",
          variant: "info",
        }}
      />

      <StatCard
        title="Critical Vulnerabilities"
        value="12"
        trend={-8}
        trendLabel="resolved"
        status={{
          label: "High Risk",
          variant: "danger",
        }}
        variant="danger"
      />

      <StatCard
        title="Threat Score"
        value="72"
        trend={9}
        trendLabel="elevated activity"
        status={{
          label: "Warning",
          variant: "warning",
        }}
        variant="warning"
      />
    </DashboardGrid>
  );
}

export default OverviewMetrics;
