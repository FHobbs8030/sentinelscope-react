import DashboardCard from "./components/DashboardCard";
import ActionButtons from "./components/ActionButtons";
import SystemStatus from "./components/SystemStatus";
import TargetInput from "./components/TargetInput";

function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <ActionButtons />

      <SystemStatus />

      <TargetInput />

      <DashboardCard />
    </div>
  );
}

export default Dashboard;
