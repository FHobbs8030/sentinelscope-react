const THREAT_NARRATIVES = {
recon: {
summary:
"Reconnaissance activity indicates external information gathering against publicly accessible assets.",

operatorGuidance:
  "Review exposed assets and minimize unnecessary public information disclosure.",

},

enumeration: {
summary:
"Enumeration activity indicates discovery of exposed services, hosts, or infrastructure components.",

operatorGuidance:
  "Audit exposed services and validate access controls, configurations, and network exposure.",

},

analysis: {
summary:
"Analysis activity suggests active evaluation of discovered assets for weaknesses and potential attack paths.",

operatorGuidance:
  "Prioritize vulnerability assessment and investigate assets showing elevated risk.",

},

exploitation: {
summary:
"Exploitation-related activity indicates a heightened likelihood of active attack attempts against identified targets.",

operatorGuidance:
  "Review security controls, investigate indicators of compromise, and initiate response procedures if necessary.",

},

reporting: {
summary:
"Reporting activity indicates assessment completion and consolidation of collected intelligence.",

operatorGuidance:
  "Review findings, validate results, and prioritize remediation activities.",

},

failure: {
summary:
"Operational failure occurred during the assessment process, reducing available intelligence visibility.",

operatorGuidance:
  "Review runtime telemetry and investigate failure conditions before rerunning the assessment.",

},
};

export function generateThreatNarrative(stage) {
return THREAT_NARRATIVES[stage] ?? THREAT_NARRATIVES.failure;
}
