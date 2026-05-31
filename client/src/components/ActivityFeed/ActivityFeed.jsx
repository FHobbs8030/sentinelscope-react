import "./ActivityFeed.css";

import ActivityFeedItem from "./ActivityFeedItem";

import useTelemetry from "../../hooks/useTelemetry";

function ActivityFeed() {
  const telemetryLogs = useTelemetry();

  const activityEvents = [...telemetryLogs]
    .reverse()
    .slice(0, 12)
    .map((log) => ({
      id: log.id,

      type: mapTelemetryLevel(log.level),

      title: log.message,

      timestamp: new Date(log.timestamp).getTime(),

      source: log.source,
    }));

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
        {activityEvents.map((event) => (
          <ActivityFeedItem key={event.id} event={event} />
        ))}
      </div>
    </aside>
  );
}

function mapTelemetryLevel(level) {
  switch (level) {
    case "success":
      return "success";

    case "warning":
      return "warning";

    case "error":
      return "critical";

    case "system":
      return "info";

    default:
      return "info";
  }
}

export default ActivityFeed;
