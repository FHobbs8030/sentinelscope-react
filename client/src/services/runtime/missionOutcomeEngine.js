const SCAN_TYPE_PROFILES = {
  full: {
    completionChance: 0.9,
    failureChance: 0.05,
    interruptionChance: 0.05,
    findingsMultiplier: 1.2,
  },

  recon: {
    completionChance: 0.98,
    failureChance: 0.01,
    interruptionChance: 0.01,
    findingsMultiplier: 0.7,
  },

  enumeration: {
    completionChance: 0.92,
    failureChance: 0.04,
    interruptionChance: 0.04,
    findingsMultiplier: 1.0,
  },

  vulnerability: {
    completionChance: 0.8,
    failureChance: 0.15,
    interruptionChance: 0.05,
    findingsMultiplier: 1.5,
  },
};

const SEVERITY_PROFILES = {
  low: {
    criticalChance: 0.01,
    findingsMultiplier: 0.6,
  },

  medium: {
    criticalChance: 0.05,
    findingsMultiplier: 1.0,
  },

  high: {
    criticalChance: 0.15,
    findingsMultiplier: 1.4,
  },

  critical: {
    criticalChance: 0.3,
    findingsMultiplier: 2.0,
  },
};

export function createMissionProfile({
  scanType = "full",
  severity = "medium",
}) {
  const typeProfile =
    SCAN_TYPE_PROFILES[scanType.toLowerCase()] || SCAN_TYPE_PROFILES.full;

  const severityProfile =
    SEVERITY_PROFILES[severity.toLowerCase()] || SEVERITY_PROFILES.medium;

  return {
    completionChance: typeProfile.completionChance,

    failureChance: typeProfile.failureChance,

    interruptionChance: typeProfile.interruptionChance,

    findingsMultiplier:
      typeProfile.findingsMultiplier * severityProfile.findingsMultiplier,

    criticalChance: severityProfile.criticalChance,
  };
}

export function determineMissionOutcome(missionProfile) {
  const roll = Math.random();

  const completionThreshold = missionProfile.completionChance;

  const failureThreshold = completionThreshold + missionProfile.failureChance;

  if (roll <= completionThreshold) {
    return "completed";
  }

  if (roll <= failureThreshold) {
    return "failed";
  }

  return "interrupted";
}

export function generateFindingsCount(missionProfile) {
  const baseFindings = Math.floor(Math.random() * 16) + 5;

  return Math.max(
    1,
    Math.round(baseFindings * missionProfile.findingsMultiplier),
  );
}

export function generateCriticalCount(findingsCount, missionProfile) {
  let criticals = 0;

  for (let i = 0; i < findingsCount; i++) {
    if (Math.random() < missionProfile.criticalChance) {
      criticals += 1;
    }
  }

  return criticals;
}
