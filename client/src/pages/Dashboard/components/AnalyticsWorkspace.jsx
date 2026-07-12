import FindingsOverviewSection from "./FindingsOverviewSection";
import AlertIntelligenceSection from "./AlertIntelligenceSection";

function AnalyticsWorkspace() {
  return (
    <div className="analytics-grid">
      <FindingsOverviewSection />

      <AlertIntelligenceSection />
    </div>
  );
}

export default AnalyticsWorkspace;
