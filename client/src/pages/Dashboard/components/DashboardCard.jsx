import Card from "../../../components/ui/Card";

function DashboardCard() {
  return (
    <Card
      title="Threat Analysis"
      subtitle="Live security telemetry"
      variant="info"
      footer={<span>Updated 2 mins ago</span>}
    >
      <p>Active monitoring enabled across all nodes.</p>
    </Card>
  );
}

export default DashboardCard;
