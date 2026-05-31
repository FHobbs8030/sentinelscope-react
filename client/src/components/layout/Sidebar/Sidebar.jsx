import "./Sidebar.css";

const navigation = [
  {
    section: "MAIN",
    items: ["Dashboard", "Targets", "Scans"],
  },
  {
    section: "RECON",
    items: ["Recon", "Enumeration", "Port Scanning", "DNS Analysis"],
  },
  {
    section: "VULNERABILITY",
    items: ["Vulnerability Scan", "Findings", "CVEs"],
  },
  {
    section: "REPORTING",
    items: ["Reports", "Exports"],
  },
  {
    section: "SYSTEM",
    items: ["Settings", "Users", "API Keys"],
  },
];

function Sidebar({ className = "sidebar", onClose }) {
  return (
    <aside className={className}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">S</div>

          <div className="sidebar-logo-text">
            <h2>SentinelScope</h2>

            <p>Attack Surface Intelligence</p>
          </div>
        </div>

        <button
          className="sidebar-mobile-close"
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          ✕
        </button>
      </div>

      <nav className="sidebar-navigation">
        {navigation.map((group) => (
          <div key={group.section} className="sidebar-section">
            <p className="sidebar-section-title">{group.section}</p>

            <ul className="sidebar-menu">
              {group.items.map((item, index) => (
                <li
                  key={item}
                  className={
                    index === 0 && group.section === "MAIN"
                      ? "sidebar-item active"
                      : "sidebar-item"
                  }
                >
                  <button className="sidebar-button" type="button">
                    <span className="sidebar-indicator" />

                    <span className="sidebar-label">{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className="sidebar-collapse-button"
          type="button"
          onClick={onClose}
        >
          Collapse
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
