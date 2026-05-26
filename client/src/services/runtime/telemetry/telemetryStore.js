import { TELEMETRY_LIMITS } from "./telemetryTypes";

let telemetryLogs = [];

const subscribers = new Set();

function notifySubscribers() {
  const logsSnapshot = [...telemetryLogs];

  subscribers.forEach((callback) => {
    callback(logsSnapshot);
  });
}

export function addTelemetryEntry(entry) {
  telemetryLogs = [...telemetryLogs, entry];

  if (telemetryLogs.length > TELEMETRY_LIMITS.MAX_LOG_ENTRIES) {
    telemetryLogs = telemetryLogs.slice(
      telemetryLogs.length - TELEMETRY_LIMITS.MAX_LOG_ENTRIES,
    );
  }

  notifySubscribers();
}

export function subscribe(callback) {
  subscribers.add(callback);

  callback([...telemetryLogs]);

  return () => {
    unsubscribe(callback);
  };
}

export function unsubscribe(callback) {
  subscribers.delete(callback);
}

export function getTelemetryLogs() {
  return [...telemetryLogs];
}

export function clearTelemetryLogs() {
  telemetryLogs = [];

  notifySubscribers();
}
