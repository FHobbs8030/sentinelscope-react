import { useEffect, useState } from "react";

import "./AppShell.css";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="app-shell" data-sidebar="collapsed">
      <Sidebar
        className={[
          "sidebar",
          sidebarOpen && "sidebar--open",
          !sidebarOpen && "sidebar--collapsed",
        ]
          .filter(Boolean)
          .join(" ")}
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
