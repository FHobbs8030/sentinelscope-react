import "./Targets.css";

import TargetInventoryPanel from "./TargetInventoryPanel";
import TargetDetailsPanel from "./TargetDetailsPanel";
import TargetRiskPanel from "./TargetRiskPanel";
import TargetActivityPanel from "./TargetActivityPanel";

function Targets() {
  return (
    <div className="targets-workspace">
      <div className="targets-top-row">
        <TargetInventoryPanel />
        <TargetDetailsPanel />
      </div>

      <div className="targets-bottom-row">
        <TargetRiskPanel />
        <TargetActivityPanel />
      </div>
    </div>
  );
}

export default Targets;
