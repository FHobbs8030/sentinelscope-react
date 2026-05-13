import NetworkOverviewSection from "./components/NetworkOverviewSection";
import ScanOperationsSection from "./components/ScanOperationsSection";

function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <NetworkOverviewSection />

      <ScanOperationsSection />
    </div>
  );
}

export default Dashboard;
