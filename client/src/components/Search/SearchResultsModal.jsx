import "./SearchResultsModal.css";

function SearchResultsModal({
  isOpen,
  searchTerm,
  results = {
    scans: [],
    findings: [],
    missions: [],
  },
  onClose,
  onSelect,
}) {
  if (!isOpen) return null;

  const totalResults =
    results.scans.length + results.findings.length + results.missions.length;

  const hasResults = totalResults > 0;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div
        className="search-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="search-modal-header">
          <div>
            <h3>Global Search</h3>

            <p className="search-results-count">
              {totalResults} Result{totalResults !== 1 ? "s" : ""} Found
            </p>
          </div>

          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="search-modal-content">
          <p>
            Results for: <strong>{searchTerm}</strong>
          </p>

          {!hasResults && (
            <div className="search-empty-state">
              <h4>No Results Found</h4>

              <p>Try searching:</p>

              <ul>
                <li>Target names</li>
                <li>Scan statuses</li>
                <li>Mission names</li>
                <li>Finding severities</li>
              </ul>
            </div>
          )}

          {results.scans.length > 0 && (
            <>
              <h4>Scans ({results.scans.length})</h4>

              {results.scans.map((scan) => (
                <button
                  key={scan.id}
                  type="button"
                  className="search-result-item"
                  onClick={() => onSelect(scan)}
                >
                  <div className="search-result-main">
                    <span className="search-result-title">{scan.title}</span>

                    {scan.subtitle && (
                      <span className="search-result-subtitle">
                        {scan.subtitle}
                      </span>
                    )}
                  </div>

                  {scan.status && (
                    <span className="search-result-status">{scan.status}</span>
                  )}
                </button>
              ))}
            </>
          )}

          {results.findings.length > 0 && (
            <>
              <h4>Findings ({results.findings.length})</h4>

              {results.findings.map((finding) => (
                <button
                  key={finding.id}
                  type="button"
                  className="search-result-item"
                  onClick={() => onSelect(finding)}
                >
                  <div className="search-result-main">
                    <span className="search-result-title">{finding.title}</span>

                    {finding.subtitle && (
                      <span className="search-result-subtitle">
                        {finding.subtitle}
                      </span>
                    )}
                  </div>

                  {finding.status && (
                    <span className="search-result-status">
                      {finding.status}
                    </span>
                  )}
                </button>
              ))}
            </>
          )}

          {results.missions.length > 0 && (
            <>
              <h4>Missions ({results.missions.length})</h4>

              {results.missions.map((mission) => (
                <button
                  key={mission.id}
                  type="button"
                  className="search-result-item"
                  onClick={() => onSelect(mission)}
                >
                  <div className="search-result-main">
                    <span className="search-result-title">
                      {mission.title || mission.name}
                    </span>

                    {mission.subtitle && (
                      <span className="search-result-subtitle">
                        {mission.subtitle}
                      </span>
                    )}
                  </div>

                  {mission.status && (
                    <span className="search-result-status">
                      {mission.status}
                    </span>
                  )}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResultsModal;
