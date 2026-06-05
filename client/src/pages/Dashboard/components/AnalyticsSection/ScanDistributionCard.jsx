import useScans from "../../../../hooks/useScans";

function ScanDistributionCard() {
  const { completedScans, failedScans, interruptedScans, activeScans } =
    useScans();

  const data = [
    {
      label: "Completed",
      value: completedScans.length,
    },

    {
      label: "Failed",
      value: failedScans.length,
    },

    {
      label: "Interrupted",
      value: interruptedScans.length,
    },

    {
      label: "Active",
      value: activeScans.length,
    },
  ];

  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <article className="analytics-card">
      <div className="analytics-card__header">
        <h3 className="analytics-card__title">Scan Distribution</h3>
      </div>

      <div className="analytics-card__content">
        {data.map((item) => (
          <div className="analytics-card__row" key={item.label}>
            <div className="analytics-card__meta">
              <span className="analytics-card__label">{item.label}</span>

              <span className="analytics-card__value">{item.value}</span>
            </div>

            <div className="analytics-card__track">
              <div
                className="analytics-card__bar"
                style={{
                  width: `${(item.value / max) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default ScanDistributionCard;
