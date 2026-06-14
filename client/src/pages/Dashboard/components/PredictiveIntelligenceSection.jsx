import "./PredictiveIntelligenceSection.css";

function PredictiveIntelligenceSection({ alerts = [] }) {
  const alertsWithPredictions = alerts.filter((alert) => alert.prediction);

  const latestAlert = alertsWithPredictions[0];

  const prediction = latestAlert?.prediction;

  if (!prediction) {
    return (
      <section className="predictive-intelligence-section">
        <div className="predictive-intelligence-empty">
          No predictive intelligence available.
        </div>
      </section>
    );
  }

  return (
    <section className="predictive-intelligence-section">
      <div className="predictive-intelligence-header">
        <h2>Predictive Intelligence</h2>
        <p>Forward-looking threat assessment and escalation forecasting</p>
      </div>

      <div className="predictive-intelligence-grid">
        <div className="prediction-card">
          <span className="prediction-label">Predicted Next Stage</span>

          <span className="prediction-value">
            {prediction.predictedNextStage}
          </span>
        </div>

        <div className="prediction-card">
          <span className="prediction-label">Risk Trend</span>

          <span className="prediction-value">
            {prediction.predictedRiskTrend}
          </span>
        </div>

        <div className="prediction-card">
          <span className="prediction-label">Escalation Window</span>

          <span className="prediction-value">
            {prediction.estimatedTimeToEscalation}
          </span>
        </div>

        <div className="prediction-card">
          <span className="prediction-label">Prediction Confidence</span>

          <span className="prediction-value">
            {prediction.confidence?.level}
          </span>

          <span className="prediction-score">
            Score: {prediction.confidence?.score}
          </span>
        </div>
      </div>

      <div className="prediction-forecast-card">
        <h3>Executive Forecast</h3>

        <p>{prediction.executiveForecast}</p>
      </div>
    </section>
  );
}

export default PredictiveIntelligenceSection;
