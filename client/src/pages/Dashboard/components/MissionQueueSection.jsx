import "./MissionQueueSection.css";

import useMissions from "../../../hooks/useMissions";

function formatTimestamp(timestamp) {
  if (!timestamp) {
    return "--";
  }

  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MissionQueueSection() {
  const { missions } = useMissions();

  return (
    <section className="mission-queue-section">
      <div className="mission-queue-section__header">
        <div>
          <h2 className="mission-queue-section__title">
            Mission Control Queue
          </h2>

          <p className="mission-queue-section__subtitle">
            Active and historical orchestration missions
          </p>
        </div>

        <span className="mission-queue-section__count">
          {missions.length} Missions
        </span>
      </div>

      <div className="mission-queue-table">
        <div className="mission-queue-table__header">
          <span>Target</span>
          <span>Type</span>
          <span>State</span>
          <span>Created</span>
        </div>

        {missions.length === 0 ? (
          <div className="mission-queue-table__empty">
            No missions have been launched.
          </div>
        ) : (
          missions.map((mission) => (
            <div
              key={mission.id ?? mission._id}
              className="mission-queue-table__row"
            >
              <span
                className="mission-queue-table__target"
                title={mission.target}
              >
                {mission.target}
              </span>

              <span>{mission.type}</span>

              <span>
                <span
                  className={`mission-state mission-state--${mission.state}`}
                >
                  {mission.state}
                </span>
              </span>

              <span>{formatTimestamp(mission.createdAt)}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default MissionQueueSection;
