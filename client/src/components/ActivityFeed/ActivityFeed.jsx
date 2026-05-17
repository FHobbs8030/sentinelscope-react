import "./ActivityFeed.css";

import activityData from "./activityData";

import ActivityFeedItem from "./ActivityFeedItem";

function ActivityFeed() {
  return (
    <aside className="activity-feed">
      <div className="activity-feed-header">
        <div className="activity-feed-header-content">
          <h3 className="activity-feed-heading">Live Activity</h3>

          <p className="activity-feed-subtitle">
            Real-time operational telemetry
          </p>
        </div>

        <span className="activity-feed-status">Monitoring</span>
      </div>

      <div className="activity-feed-list">
        {activityData.map((event) => (
          <ActivityFeedItem key={event.id} event={event} />
        ))}
      </div>
    </aside>
  );
}

export default ActivityFeed;
