import MissionQueueSection from "./MissionQueueSection";
import ScanOperationsSection from "./ScanOperationsSection";
import NetworkOverviewSection from "./NetworkOverviewSection";

function OperationalWorkspace() {
  return (
    <div className="operations-grid">
      <div className="operations-primary">
        <MissionQueueSection />

        <ScanOperationsSection />
      </div>

      <div className="operations-secondary">
        <NetworkOverviewSection />
      </div>
    </div>
  );
}

export default OperationalWorkspace;
