import "./ActivityFeed.css";

import activityData from "./activityData";
import ActivityItem from "./ActivityItem";

function ActivityFeed() {
  return (
    <section className="activity-feed">
      <div className="activity-feed__header">
        <h3 className="activity-feed__title">
          Live Activity
        </h3>

        <span className="activity-feed__status">
          Monitoring Active
        </span>
      </div>

      <div className="activity-feed__list">
        {activityData.map((item) => (
          <ActivityItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

export default ActivityFeed;
