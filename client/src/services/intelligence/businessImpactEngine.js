const BUSINESS_IMPACT_PROFILES = {
  recon: {
    level: "Low",

    summary:
      "External reconnaissance may reveal publicly accessible assets and information that could be leveraged during future attack activity.",
  },

  enumeration: {
    level: "Moderate",

    summary:
      "Discovery of exposed services and infrastructure increases attack surface visibility and may assist adversaries in identifying potential entry points.",
  },

  analysis: {
    level: "Moderate",

    summary:
      "Active assessment of discovered assets may identify vulnerabilities that could lead to unauthorized access or service disruption.",
  },

  exploitation: {
    level: "High",

    summary:
      "Exploitation activity presents elevated operational risk and may result in service disruption, data exposure, or unauthorized system access.",
  },

  reporting: {
    level: "Informational",

    summary:
      "Assessment activities have concluded and findings should be reviewed to determine overall organizational risk exposure.",
  },

  failure: {
    level: "Unknown",

    summary:
      "Assessment failure reduced visibility into security posture and may leave unidentified risks unassessed.",
  },
};

export function generateBusinessImpact(stage) {
  return BUSINESS_IMPACT_PROFILES[stage] ?? BUSINESS_IMPACT_PROFILES.failure;
}
