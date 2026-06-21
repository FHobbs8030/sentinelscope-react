import "./SearchResultsModal.css";

function SearchResultsModal({
  isOpen,
  searchTerm,
  results,
  onClose,
  onSelect,
}) {
  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div
        className="search-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="search-modal-header">
          <h3>Search Results</h3>

          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="search-modal-content">
          <p>
            Results for: <strong>{searchTerm}</strong>
          </p>

          <h4>Scans</h4>

          {results.scans.length > 0 ? (
            results.scans.map((scan) => (
              <button
                key={scan.id}
                type="button"
                className="search-result-item"
                onClick={() => onSelect(scan)}
              >
                {scan.title}
              </button>
            ))
          ) : (
            <p>No scans found</p>
          )}

          <h4>Findings</h4>

          {results.findings.length > 0 ? (
            results.findings.map((finding) => (
              <button
                key={finding.id}
                type="button"
                className="search-result-item"
                onClick={() => onSelect(finding)}
              >
                {finding.title}
              </button>
            ))
          ) : (
            <p>No findings found</p>
          )}

          <h4>Missions</h4>

          {results.missions.length > 0 ? (
            results.missions.map((mission) => (
              <button
                key={mission.id}
                type="button"
                className="search-result-item"
                onClick={() => onSelect(mission)}
              >
                {mission.name}
              </button>
            ))
          ) : (
            <p>No missions found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResultsModal;
