const MITRE_ATTACK_PROFILES = {
  recon: {
    tactic: "Reconnaissance",
    technique: "Active Scanning",
    techniqueId: "T1595",
    confidence: "High",
  },

  enumeration: {
    tactic: "Discovery",
    technique: "Network Service Discovery",
    techniqueId: "T1046",
    confidence: "Medium",
  },

  analysis: {
    tactic: "Discovery",
    technique: "System Information Discovery",
    techniqueId: "T1082",
    confidence: "Medium",
  },

  exploitation: {
    tactic: "Initial Access",
    technique: "Exploit Public-Facing Application",
    techniqueId: "T1190",
    confidence: "High",
  },

  reporting: {
    tactic: "Impact Assessment",
    technique: "Assessment Complete",
    techniqueId: "SS-0001",
    confidence: "Low",
  },

  failure: {
    tactic: "Unknown",
    technique: "Unknown",
    techniqueId: "Unknown",
    confidence: "Low",
  },
};

export function generateMitreAttack(stage) {
  return MITRE_ATTACK_PROFILES[stage] ??
    MITRE_ATTACK_PROFILES.failure;
}
