import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Badge from "../../ui/Badge";

import "./ScanPanel.css";

function ScanPanel() {
  return (
    <Card className="scan-panel">
      <div className="scan-panel__header">
        <div>
          <h3 className="scan-panel__title">
            Network Scan
          </h3>

          <p className="scan-panel__subtitle">
            Configure and launch reconnaissance scans.
          </p>
        </div>

        <Badge
          variant="info"
          pill
        >
          Idle
        </Badge>
      </div>

      <div className="scan-panel__content">
        <Input
          label="Target"
          placeholder="192.168.1.1 or example.com"
        />

        <div className="scan-panel__options">
          <Button variant="secondary">
            Quick Scan
          </Button>

          <Button variant="secondary">
            Full Scan
          </Button>

          <Button variant="secondary">
            Stealth
          </Button>
        </div>

        <div className="scan-panel__actions">
          <Button variant="primary">
            Start Scan
          </Button>

          <Button variant="danger">
            Stop
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ScanPanel;
