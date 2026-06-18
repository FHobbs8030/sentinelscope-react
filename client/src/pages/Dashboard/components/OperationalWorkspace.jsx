import "./OperationalWorkspace.css";

import ScanLaunchPanel from "./ScanLaunchPanel";
import RecentScansPanel from "./RecentScansPanel";

import ActivityFeed from "../../../components/ActivityFeed";

function OperationalWorkspace() {
  return (
    <div className="operations-workspace">
      <ScanLaunchPanel />

      <RecentScansPanel />

      <ActivityFeed />
    </div>
  );
}

export default OperationalWorkspace;
