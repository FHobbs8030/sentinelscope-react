import Badge from "../../../components/ui/Badge";

function SystemStatus() {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <Badge variant="success" pill>
        Online
      </Badge>

      <Badge variant="danger" pill>
        Critical
      </Badge>

      <Badge variant="warning">
        Medium Risk
      </Badge>

      <Badge variant="info" outlined>
        Scanning
      </Badge>
    </div>
  );
}

export default SystemStatus;
