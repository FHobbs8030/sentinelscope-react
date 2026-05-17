const activityData = [
  {
    id: 1,

    severity: "critical",

    title: "Unauthorized Access Attempt",

    source: "AWS Gateway",

    meta: "IP: 192.168.0.14",

    description: "Multiple failed login attempts detected.",

    timestamp: Date.now() - 1000 * 60 * 2,
  },

  {
    id: 2,

    severity: "warning",

    title: "High CPU Usage",

    source: "Node-04",

    meta: "CPU exceeded 92%",

    description: "Resource utilization crossed threshold.",

    timestamp: Date.now() - 1000 * 60 * 12,
  },

  {
    id: 3,

    severity: "success",

    title: "Threat Scan Complete",

    source: "Sentinel Scanner",

    meta: "124 endpoints analyzed",

    description: "No vulnerabilities detected.",

    timestamp: Date.now() - 1000 * 60 * 35,
  },

  {
    id: 4,

    severity: "info",

    title: "System Heartbeat Restored",

    source: "Remote Monitor",

    meta: "Latency normalized",

    description: "Monitoring connection re-established.",

    timestamp: Date.now() - 1000 * 60 * 58,
  },
];

export default activityData;
