export const SCAN_STATES = [
  "queued",
  "initializing",
  "recon",
  "enumeration",
  "analysis",
  "exploitation",
  "reporting",
  "completed",
  "failed",
  "cancelled",
];

export const STATE_TRANSITIONS = {
  queued: "initializing",
  initializing: "recon",
  recon: "enumeration",
  enumeration: "analysis",
  analysis: "exploitation",
  exploitation: "reporting",
  reporting: "completed",
};

export const TERMINAL_SCAN_STATES = ["completed", "failed", "cancelled"];

export const SCAN_STATE_METADATA = {
  queued: {
    label: "Queued",
    progressMin: 0,
    progressMax: 4,
    duration: 4000,
    color: "neutral",
    canFail: false,
  },

  initializing: {
    label: "Initializing",
    progressMin: 5,
    progressMax: 12,
    duration: 5000,
    color: "info",
    canFail: false,
  },

  recon: {
    label: "Reconnaissance",
    progressMin: 13,
    progressMax: 28,
    duration: 8000,
    color: "primary",
    canFail: true,
  },

  enumeration: {
    label: "Enumeration",
    progressMin: 29,
    progressMax: 48,
    duration: 10000,
    color: "primary",
    canFail: true,
  },

  analysis: {
    label: "Vulnerability Analysis",
    progressMin: 49,
    progressMax: 72,
    duration: 12000,
    color: "warning",
    canFail: true,
  },

  exploitation: {
    label: "Exploitation",
    progressMin: 73,
    progressMax: 88,
    duration: 9000,
    color: "danger",
    canFail: true,
  },

  reporting: {
    label: "Reporting",
    progressMin: 89,
    progressMax: 99,
    duration: 6000,
    color: "success",
    canFail: false,
  },

  completed: {
    label: "Completed",
    progressMin: 100,
    progressMax: 100,
    duration: 0,
    color: "success",
    canFail: false,
  },

  failed: {
    label: "Failed",
    progressMin: 0,
    progressMax: 100,
    duration: 0,
    color: "danger",
    canFail: false,
  },

  cancelled: {
    label: "Cancelled",
    progressMin: 0,
    progressMax: 100,
    duration: 0,
    color: "neutral",
    canFail: false,
  },
};

export const STAGE_ACTIVITY_MESSAGES = {
  queued: ["Scan added to operational queue", "Awaiting runtime allocation"],

  initializing: [
    "Initializing scan runtime",
    "Loading scan modules",
    "Establishing operational context",
  ],

  recon: [
    "Performing target reconnaissance",
    "Collecting DNS intelligence",
    "Mapping target surface",
    "Gathering network metadata",
  ],

  enumeration: [
    "Enumerating exposed services",
    "Scanning open ports",
    "Fingerprinting applications",
    "Enumerating accessible endpoints",
  ],

  analysis: [
    "Analyzing vulnerability signatures",
    "Evaluating exploit vectors",
    "Correlating scan findings",
    "Inspecting service configurations",
  ],

  exploitation: [
    "Testing exploit viability",
    "Simulating attack execution",
    "Validating privilege escalation paths",
    "Executing controlled exploit chain",
  ],

  reporting: [
    "Compiling operational report",
    "Generating findings summary",
    "Finalizing scan intelligence",
  ],

  completed: ["Scan completed successfully", "Operational report finalized"],

  failed: ["Scan runtime failure detected", "Operational scan aborted"],

  cancelled: ["Scan cancelled by operator"],
};

export const SEVERITY_LEVELS = ["low", "medium", "high", "critical"];

export const getNextScanState = (currentState) => {
  return STATE_TRANSITIONS[currentState] ?? currentState;
};

export const isTerminalScanState = (state) => {
  return TERMINAL_SCAN_STATES.includes(state);
};

export const getScanStateMetadata = (state) => {
  return SCAN_STATE_METADATA[state] ?? null;
};

export const getRandomStageMessage = (state) => {
  const messages = STAGE_ACTIVITY_MESSAGES[state] ?? [];

  if (!messages.length) {
    return "Processing operational event";
  }

  const index = Math.floor(Math.random() * messages.length);

  return messages[index];
};

export const generateStageProgress = (state) => {
  const metadata = getScanStateMetadata(state);

  if (!metadata) {
    return 0;
  }

  const { progressMin, progressMax } = metadata;

  if (progressMin === progressMax) {
    return progressMax;
  }

  return Math.floor(
    Math.random() * (progressMax - progressMin + 1) + progressMin,
  );
};

export const shouldFailScan = (state, failureRate = 0.08) => {
  const metadata = getScanStateMetadata(state);

  if (!metadata?.canFail) {
    return false;
  }

  return Math.random() < failureRate;
};
