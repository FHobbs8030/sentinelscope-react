import { useEffect, useState } from "react";

import "./AppShell.css";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setSidebarOpen((current) => !current);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="app-shell" data-sidebar="collapsed">
      <Sidebar
        className={[
          "sidebar",
          sidebarOpen ? "sidebar--open" : "sidebar--collapsed",
        ].join(" ")}
        onClose={closeSidebar}
      />

      <div
        className={
          sidebarOpen
            ? "sidebar-overlay sidebar-overlay--visible"
            : "sidebar-overlay"
        }
        onClick={closeSidebar}
        aria-hidden={!sidebarOpen}
      />

      <div className="app-shell-main">
        <Topbar onMenuToggle={handleMenuToggle} />

        <main className="page-container">{children}</main>
      </div>
    </div>
  );
}

export default AppShell;
