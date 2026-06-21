import { useMemo } from "react";

import  useScans  from "../../hooks/useScans";

import "./TargetActivityPanel.css";

function TargetActivityPanel() {
  const { scans = [] } = useScans();

  const recentScans = useMemo(() => {
    return [...scans]
      .sort((a, b) => {
        const aDate = new Date(a.updatedAt || a.createdAt || 0);

        const bDate = new Date(b.updatedAt || b.createdAt || 0);

        return bDate - aDate;
      })
      .slice(0, 8);
  }, [scans]);

  return (
    <section className="dashboard-card target-activity-panel">
      <div className="panel-header">
        <h3>Activity Timeline</h3>
      </div>

      <div className="activity-list">
        {recentScans.length === 0 ? (
          <div className="activity-empty">No Recent Activity</div>
        ) : (
          recentScans.map((scan) => (
            <div key={scan._id || scan.id} className="activity-item">
              <div className="activity-target">{scan.target}</div>

              <div className="activity-meta">
                <span>{scan.status}</span>

                <span>{scan.currentStage || "queued"}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default TargetActivityPanel;
