import "./Topbar.css";

function Topbar({ onMenuToggle }) {
  return (
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
        />
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
  );
}

export default Topbar;
