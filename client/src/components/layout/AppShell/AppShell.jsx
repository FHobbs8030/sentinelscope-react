import "./AppShell.css";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import MainContent from "../MainContent/MainContent";
import PageContainer from "../PageContainer/PageContainer";

function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />

      <MainContent>
        <Topbar />

        <PageContainer>{children}</PageContainer>
      </MainContent>
    </div>
  );
}

export default AppShell;
