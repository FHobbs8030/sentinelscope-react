import SectionHeader from "../../../components/dashboard/SectionHeader";
import ScanPanel from "../../../components/dashboard/ScanPanel";

function ScanOperationsSection() {
  return (
    <section>
      <SectionHeader
        title="Scan Operations"
        subtitle="
          Launch and manage reconnaissance
          and vulnerability scans.
        "
      />

      <div
        style={{
          marginTop: "1.5rem",
        }}
      >
        <ScanPanel />
      </div>
    </section>
  );
}

export default ScanOperationsSection;
