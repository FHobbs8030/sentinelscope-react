import { useState } from "react";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import MainContent from "../MainContent/MainContent";
import PageContainer from "../PageContainer/PageContainer";

import "./AppShell.css";

function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <MainContent>
        <Topbar onMenuToggle={toggleSidebar} />

        <PageContainer>{children}</PageContainer>
      </MainContent>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}
    </div>
  );
}

export default AppShell;
