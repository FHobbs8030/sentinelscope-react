import Button from "../../../components/ui/Button";

function ActionButtons() {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <Button variant="primary">
        Scan Network
      </Button>

      <Button variant="secondary">
        View Logs
      </Button>

      <Button variant="danger">
        Stop Scan
      </Button>
    </div>
  );
}

export default ActionButtons;
