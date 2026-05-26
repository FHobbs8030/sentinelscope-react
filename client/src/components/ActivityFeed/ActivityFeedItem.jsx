import "./ActivityFeedItem.css";

import { severityConfig, formatTimeAgo } from "./activityUtils";

function ActivityFeedItem({ event }) {
  const severity = severityConfig[event.type] || severityConfig.info;

  return (
    <article className={`activity-feed-item ${severity.className}`}>
      <div className="activity-feed-item-header">
        <div className="activity-feed-severity">
          <span className="severity-dot" />

          <span className="severity-label">{severity.label}</span>
        </div>

        <span className="activity-feed-timestamp">
          {formatTimeAgo(event.timestamp)}
        </span>
      </div>

      <h4 className="activity-feed-title">{event.title}</h4>

      <p className="activity-feed-description">
        Live operational telemetry event detected.
      </p>

      <div className="activity-feed-meta-row">
        <span className="activity-feed-source">{event.source}</span>

        <span className="activity-feed-meta">Runtime Telemetry</span>
      </div>
    </article>
  );
}

export default ActivityFeedItem;
