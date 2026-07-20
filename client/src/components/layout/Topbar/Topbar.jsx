import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import useScans from "../../../hooks/useScans";
import useFindings from "../../../hooks/useFindings";
import useMissions from "../../../hooks/useMissions";

import SearchResultsModal from "../../Search/SearchResultsModal";

import "./Topbar.css";

function Topbar({ onMenuToggle, sidebarOpen }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [showSearchResults, setShowSearchResults] = useState(false);

  const { scans = [] } = useScans();

  const { findings = [] } = useFindings();

  const { missions = [] } = useMissions();

  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return {
        scans: [],
        findings: [],
        missions: [],
      };
    }

    return {
      scans: scans
        .filter((scan) =>
          [scan?.name, scan?.target, scan?.status, scan?.currentStage]
            .join(" ")
            .toLowerCase()
            .includes(query),
        )
        .map((scan) => ({
          id: scan.clientScanId || scan.scanId || scan._id || scan.id,
          type: "scan",
          title: scan.name,
          subtitle: scan.target,
          status: scan.status,
          raw: scan,
        })),

      findings: findings
        .filter((finding) =>
          [
            finding?.title,
            finding?.description,
            finding?.severity,
            finding?.target,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query),
        )
        .map((finding) => ({
          id: finding.clientFindingId || finding._id || finding.id,
          type: "finding",
          title: finding.title,
          subtitle: finding.target,
          status: finding.severity,
          raw: finding,
        })),

      missions: missions
        .filter((mission) =>
          [mission?.name, mission?.target, mission?.state]
            .join(" ")
            .toLowerCase()
            .includes(query),
        )
        .map((mission) => ({
          id:
            mission.clientMissionId ||
            mission.missionId ||
            mission._id ||
            mission.id,
          type: "mission",
          title: mission.name,
          subtitle: mission.target,
          status: mission.state,
          raw: mission,
        })),
    };
  }, [searchTerm, scans, findings, missions]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      return;
    }

    setShowSearchResults(true);
  };

  const handleSearchResultSelect = (item) => {
    if (!item?.type || !item?.id) {
      return;
    }

    const params = new URLSearchParams({
      focus: item.type,
      id: String(item.id),
    });

    setShowSearchResults(false);

    navigate(`/?${params.toString()}`);

    window.requestAnimationFrame(() => {
      document.getElementById("dashboard-operations")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar-workspace">
          <h1 className="topbar-workspace-title">Dashboard</h1>

          <p className="topbar-workspace-description">
            Attack surface operations and intelligence
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
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={sidebarOpen}
            aria-controls="primary-sidebar"
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
        onSelect={handleSearchResultSelect}
      />
    </>
  );
}

export default Topbar;
