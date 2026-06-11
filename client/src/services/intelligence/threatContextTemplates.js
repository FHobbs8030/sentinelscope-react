export const THREAT_CONTEXT_TEMPLATES = {
  recon: {
    category: "Reconnaissance",
    attackStage: "Discovery",
    impact: "Information Exposure",
    confidence: "Medium",
    recommendedActions: [
      "Review exposed services",
      "Validate access controls",
      "Reduce attack surface",
    ],
  },

  enumeration: {
    category: "Enumeration",
    attackStage: "Mapping",
    impact: "Asset Intelligence Disclosure",
    confidence: "Medium",
    recommendedActions: [
      "Audit discovered assets",
      "Review service configurations",
      "Restrict unnecessary exposure",
    ],
  },

  analysis: {
    category: "Vulnerability Analysis",
    attackStage: "Assessment",
    impact: "Potential Security Weakness",
    confidence: "High",
    recommendedActions: [
      "Validate findings",
      "Prioritize remediation",
      "Review vulnerable assets",
    ],
  },

  exploitation: {
    category: "Exploitation Attempt",
    attackStage: "Attack",
    impact: "Potential System Compromise",
    confidence: "High",
    recommendedActions: [
      "Investigate immediately",
      "Review affected assets",
      "Escalate to security operations",
    ],
  },

  reporting: {
    category: "Reporting",
    attackStage: "Post Assessment",
    impact: "Security Intelligence Generated",
    confidence: "High",
    recommendedActions: [
      "Review generated report",
      "Prioritize remediation tasks",
      "Document findings",
    ],
  },

  failure: {
    category: "Operational Failure",
    attackStage: "Execution",
    impact: "Scan Interruption",
    confidence: "High",
    recommendedActions: [
      "Review runtime telemetry",
      "Validate execution path",
      "Investigate infrastructure health",
    ],
  },
};
