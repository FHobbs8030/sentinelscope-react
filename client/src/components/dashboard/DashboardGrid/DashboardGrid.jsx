import "./DashboardGrid.css";

function DashboardGrid({
  children,
  columns = 4,
  className = "",
}) {
  return (
    <div
      className={`
        dashboard-grid
        dashboard-grid--${columns}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default DashboardGrid;
