import { useEffect, useRef, useState } from "react";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  FileText,
  LayoutDashboard,
  Shield,
  Terminal,
} from "lucide-react";

import "./DashboardSectionNav.css";

const dashboardSections = [
  {
    id: "dashboard-overview",
    label: "Overview",
    color: "#60a5fa",
    rgb: "96, 165, 250",
    icon: LayoutDashboard,
  },
  {
    id: "dashboard-operations",
    label: "Operations",
    color: "#22d3ee",
    rgb: "34, 211, 238",
    icon: Activity,
  },
  {
    id: "dashboard-analytics",
    label: "Analytics",
    color: "#a78bfa",
    rgb: "167, 139, 250",
    icon: BarChart3,
  },
  {
    id: "dashboard-executive",
    label: "Executive",
    color: "#fbbf24",
    rgb: "251, 191, 36",
    icon: Shield,
  },
  {
    id: "dashboard-alerts",
    label: "Alerts",
    color: "#f87171",
    rgb: "248, 113, 113",
    icon: AlertTriangle,
  },
  {
    id: "dashboard-reports",
    label: "Reports",
    color: "#4ade80",
    rgb: "74, 222, 128",
    icon: FileText,
  },
  {
    id: "dashboard-terminal",
    label: "Terminal",
    color: "#2dd4bf",
    rgb: "45, 212, 191",
    icon: Terminal,
  },
];

function DashboardSectionNav() {
  const [activeSection, setActiveSection] = useState(dashboardSections[0].id);

  const navRef = useRef(null);
  const controlTrackRef = useRef(null);
  const selectionLockRef = useRef(false);
  const selectionTimerRef = useRef(null);

  useEffect(() => {
    let animationFrameId = null;

    const updateActiveSection = () => {
      animationFrameId = null;

      if (selectionLockRef.current) {
        return;
      }

      const navBottom = navRef.current?.getBoundingClientRect().bottom ?? 166;

      const activationLine = navBottom + 24;

      let nextSection = dashboardSections[0].id;

      dashboardSections.forEach(({ id }) => {
        const section = document.getElementById(id);

        if (!section) {
          return;
        }

        const sectionBounds = section.getBoundingClientRect();

        if (sectionBounds.top <= activationLine) {
          nextSection = id;
        }
      });

      const pageBottomReached =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;

      if (pageBottomReached) {
        nextSection = dashboardSections[dashboardSections.length - 1].id;
      }

      setActiveSection((currentSection) =>
        currentSection === nextSection ? currentSection : nextSection,
      );
    };

    const handleViewportChange = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", handleViewportChange, {
      passive: true,
    });

    window.addEventListener("resize", handleViewportChange);

    return () => {
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    const track = controlTrackRef.current;

    if (!track || track.scrollWidth <= track.clientWidth) {
      return;
    }

    const activeControl = track.querySelector(
      `[data-section-id="${activeSection}"]`,
    );

    if (!activeControl) {
      return;
    }

    const targetLeft =
      activeControl.offsetLeft -
      track.clientWidth / 2 +
      activeControl.clientWidth / 2;

    track.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  }, [activeSection]);

  useEffect(() => {
    return () => {
      if (selectionTimerRef.current) {
        window.clearTimeout(selectionTimerRef.current);
      }
    };
  }, []);

  const handleSectionSelection = (event, sectionId) => {
    event.preventDefault();

    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    setActiveSection(sectionId);
    selectionLockRef.current = true;

    if (selectionTimerRef.current) {
      window.clearTimeout(selectionTimerRef.current);
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    selectionTimerRef.current = window.setTimeout(() => {
      selectionLockRef.current = false;
    }, 1200);
  };

  return (
    <aside
      ref={navRef}
      className="dashboard-section-nav"
      aria-label="Dashboard section controls"
    >
      <div className="dashboard-section-nav__status">
        <div>
          <span className="dashboard-section-nav__eyebrow">
            Section Control
          </span>

          <span className="dashboard-section-nav__instruction">
            Select operational workspace
          </span>
        </div>

        <span className="dashboard-section-nav__sync">
          <span className="dashboard-section-nav__sync-light" />
          Scroll Sync
        </span>
      </div>

      <nav
        ref={controlTrackRef}
        className="dashboard-section-nav__track"
        aria-label="Dashboard sections"
      >
        {dashboardSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              data-section-id={section.id}
              className="dashboard-section-nav__control"
              aria-current={isActive ? "location" : undefined}
              style={{
                "--section-color": section.color,
                "--section-color-rgb": section.rgb,
              }}
              onClick={(event) => handleSectionSelection(event, section.id)}
            >
              <span className="dashboard-section-nav__indicator" />

              <Icon
                className="dashboard-section-nav__icon"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />

              <span className="dashboard-section-nav__label">
                {section.label}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

export default DashboardSectionNav;
