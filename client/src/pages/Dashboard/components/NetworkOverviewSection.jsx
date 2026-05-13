import Button from "../../../components/ui/Button";

import SectionHeader from "../../../components/dashboard/SectionHeader";
import OverviewMetrics from "./OverviewMetrics";

function NetworkOverviewSection() {
  return (
    <section>
      <SectionHeader
        title="Network Overview"
        subtitle="
          Real-time visibility into active hosts,
          vulnerabilities, and network activity.
        "
        actions={
          <Button variant="primary">
            Start Scan
          </Button>
        }
      />

      <div
        style={{
          marginTop: "1.5rem",
        }}
      >
        <OverviewMetrics />
      </div>
    </section>
  );
}

export default NetworkOverviewSection;
