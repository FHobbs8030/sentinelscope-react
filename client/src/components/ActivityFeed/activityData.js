const activityData = [
  {
    id: 1,
    type: "critical",
    title: "Unauthorized Access Attempt",
    description: "Multiple failed login attempts detected.",
    timestamp: Date.now() - 1000 * 60 * 2,
  },

  {
    id: 2,
    type: "warning",
    title: "High CPU Usage",
    description: "Node-04 exceeded CPU threshold.",
    timestamp: Date.now() - 1000 * 60 * 12,
  },

  {
    id: 3,
    type: "success",
    title: "Threat Scan Complete",
    description: "No vulnerabilities detected.",
    timestamp: Date.now() - 1000 * 60 * 35,
  },

  {
    id: 4,
    type: "info",
    title: "System Heartbeat Restored",
    description: "Remote monitoring connection re-established.",
    timestamp: Date.now() - 1000 * 60 * 58,
  },
];

export default activityData;
