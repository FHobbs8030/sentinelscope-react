import { useState } from "react";

import SearchResultsModal from "../../Search/SearchResultsModal";

import "./Topbar.css";

function Topbar({ onMenuToggle }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [showSearchResults, setShowSearchResults] = useState(false);

  const [searchResults, setSearchResults] = useState({
    scans: [],
    findings: [],
    missions: [],
  });

  const handleSearch = () => {
    const query = searchTerm.trim();

    if (!query) {
      return;
    }

    console.log("Searching:", query);

    setSearchResults({
      scans: [
        {
          id: 1,
          title: "Walmart.com",
          status: "Running",
        },
        {
          id: 2,
          title: "Google.com",
          status: "Completed",
        },
      ],

      findings: [
        {
          id: 1,
          title: "Critical Security Finding",
          severity: "Critical",
        },
        {
          id: 2,
          title: "High Severity Security Finding",
          severity: "High",
        },
      ],

      missions: [
        {
          id: 1,
          name: "Mission Alpha",
          state: "Active",
        },
        {
          id: 2,
          name: "Mission Bravo",
          state: "Queued",
        },
      ],
    });

    setShowSearchResults(true);
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar-workspace">
          <h1 className="topbar-workspace-title">Dashboard</h1>

          <p className="topbar-workspace-description">
            Unified Overview of Your Attack Surface, Operations and Intelligence
          </p>
        </div>

        <div className="topbar-search">
          <input
            type="text"
            className="topbar-search-input"
            placeholder="Search targets, scans, findings, missions..."
            aria-label="Search platform"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <button
            className="topbar-search-button"
            type="button"
            onClick={handleSearch}
            aria-label="Search"
          >
            🔍
          </button>
        </div>

        <div className="topbar-right">
          <button
            className="topbar-icon-button"
            type="button"
            aria-label="Notifications"
          >
            🔔
          </button>

          <button
            className="topbar-icon-button"
            type="button"
            aria-label="Settings"
          >
            ⚙️
          </button>

          <div className="topbar-user">
            <div className="topbar-avatar">A</div>

            <div className="topbar-user-info">
              <span className="topbar-user-name">Analyst</span>

              <span className="topbar-user-role">Administrator</span>
            </div>
          </div>

          <button
            className="topbar-menu-toggle"
            type="button"
            onClick={onMenuToggle}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        </div>
      </header>

      <SearchResultsModal
        isOpen={showSearchResults}
        searchTerm={searchTerm}
        results={searchResults}
        onClose={() => setShowSearchResults(false)}
        onSelect={(item) => {
          console.log("Selected:", item);
        }}
      />
    </>
  );
}

export default Topbar;
