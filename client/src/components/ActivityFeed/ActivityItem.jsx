import "./ActivityFeed.css";
import { formatTimeAgo } from "./activityUtils";

function ActivityItem({ item }) {
  return (
    <article className={`activity-item activity-item--${item.type}`}>
      <div className="activity-item__header">
        <div className="activity-item__title-group">
          <h4 className="activity-item__title">
            {item.title}
          </h4>

          <span className="activity-item__timestamp">
            {formatTimeAgo(item.timestamp)}
          </span>
        </div>

        <span className={`activity-item__badge activity-item__badge--${item.type}`}>
          {item.type}
        </span>
      </div>

      <p className="activity-item__description">
        {item.description}
      </p>
    </article>
  );
}

export default ActivityItem;
