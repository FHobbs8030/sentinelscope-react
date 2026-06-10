import "./AlertIntelligenceCard.css";

export default function AlertIntelligenceCard({ title, value }) {
  const normalizedValue = typeof value === "string" ? value.toLowerCase() : "";

  const isBadge = title === "Severity" || title === "Status";

  return (
    <div className="alert-intelligence-card">
      <h3>{title}</h3>

      {isBadge ? (
        <span
          className={`alert-badge ${title.toLowerCase()}-${normalizedValue}`}
        >
          {value}
        </span>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}
