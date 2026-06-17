import ScanOperationsSection from "./ScanOperationsSection";
import ActivityFeed from "../../../components/ActivityFeed";

import "./OperationalWorkspace.css";

function OperationalWorkspace() {
  return (
    <div className="operations-workspace">
      <ScanOperationsSection />

      <ActivityFeed />
    </div>
  );
}

export default OperationalWorkspace;
