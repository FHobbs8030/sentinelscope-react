import "./Sidebar.css";

const navigation = [
  {
    section: "MAIN",
    items: [
      { icon: "🏠", label: "Dashboard" },
      { icon: "🎯", label: "Targets" },
      { icon: "🔍", label: "Scans" },
    ],
  },
  {
    section: "RECON",
    items: [
      { icon: "🛰️", label: "Recon" },
      { icon: "📡", label: "Enumeration" },
      { icon: "🔌", label: "Port Scanning" },
      { icon: "🌐", label: "DNS Analysis" },
    ],
  },
];

function Sidebar({
  className = "sidebar",
  onClose,
}) {
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
                  key={item.label}
                  className={
                    index === 0 && group.section === "MAIN"
                      ? "sidebar-item active"
                      : "sidebar-item"
                  }
                >
                  <button className="sidebar-button" type="button">
                    <span className="sidebar-icon">{item.icon}</span>

                    <span className="sidebar-label">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

    </aside>
  );
}

export default Sidebar;
