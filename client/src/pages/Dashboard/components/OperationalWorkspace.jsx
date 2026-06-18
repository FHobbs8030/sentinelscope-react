import "./OperationalWorkspace.css";

import ScanLaunchPanel from "./ScanLaunchPanel";
import RecentScansPanel from "./RecentScansPanel";
import FindingsSeverityPanel from "./FindingsSeverityPanel";

import ActivityFeed from "../../../components/ActivityFeed";

function OperationalWorkspace() {
  return (
    <div className="operations-workspace">
      <div className="workspace-row">
        <ScanLaunchPanel />
        <RecentScansPanel />
        <ActivityFeed />
      </div>

      <div className="workspace-row">
        <FindingsSeverityPanel />
      </div>
    </div>
  );
}

export default OperationalWorkspace;
