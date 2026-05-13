import "./Topbar.css";

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-heading">
          <h1 className="topbar-title">Dashboard</h1>

          <p className="topbar-breadcrumbs">Home / Dashboard</p>
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-search">
          <input
            type="text"
            placeholder="Search targets, scans, IPs..."
            className="topbar-search-input"
          />
        </div>

        <button className="topbar-icon-button">🔔</button>

        <button className="topbar-icon-button">⚙️</button>

        <div className="topbar-user">
          <div className="topbar-user-avatar">A</div>

          <div className="topbar-user-info">
            <span className="topbar-user-name">Analyst</span>

            <span className="topbar-user-role">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
