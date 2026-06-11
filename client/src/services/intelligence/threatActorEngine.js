const THREAT_ACTOR_PROFILES = {
  recon: {
    actor: "Opportunistic Scanner",

    confidence: "Medium",

    description:
      "Automated reconnaissance activity commonly associated with internet-wide scanning and asset discovery.",
  },

  enumeration: {
    actor: "Cybercriminal",

    confidence: "Medium",

    description:
      "Enumeration activity suggests targeted discovery of exposed services and infrastructure.",
  },

  analysis: {
    actor: "Targeted Adversary",

    confidence: "Medium",

    description:
      "Analysis activity indicates evaluation of assets for weaknesses and potential attack paths.",
  },

  exploitation: {
    actor: "Advanced Threat Actor",

    confidence: "High",

    description:
      "Exploitation-related activity is consistent with an actor actively attempting to compromise systems.",
  },

  reporting: {
    actor: "Unknown",

    confidence: "Low",

    description:
      "Reporting stage does not provide sufficient evidence for actor assessment.",
  },

  failure: {
    actor: "Unknown",

    confidence: "Low",

    description:
      "Operational failure reduced visibility and prevents reliable actor assessment.",
  },
};

export function generateThreatActor(stage) {
  return THREAT_ACTOR_PROFILES[stage] ?? THREAT_ACTOR_PROFILES.failure;
}
