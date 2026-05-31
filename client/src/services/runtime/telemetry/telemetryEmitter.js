import scanEventBus, { SCAN_EVENTS } from "../scanEventBus";

import { formatTelemetryEvent } from "./telemetryFormatter";

import { addTelemetryEntry } from "./telemetryStore";

const registeredUnsubscribers = [];

function registerTelemetryEvent(eventName) {
  const unsubscribe = scanEventBus.subscribe(eventName, (event) => {
    const telemetryEntry = formatTelemetryEvent(event.type, event.payload);

    addTelemetryEntry(telemetryEntry);
  });

  registeredUnsubscribers.push(unsubscribe);
}

export function initializeTelemetryEmitter() {
  if (registeredUnsubscribers.length > 0) {
    return;
  }

 [
  SCAN_EVENTS.SCAN_CREATED,
  SCAN_EVENTS.SCAN_STARTED,
  SCAN_EVENTS.SCAN_STAGE_CHANGED,
  SCAN_EVENTS.SCAN_COMPLETED,
  SCAN_EVENTS.SCAN_FAILED,
  SCAN_EVENTS.SCAN_CANCELLED,
  SCAN_EVENTS.FINDING_DISCOVERED,
  SCAN_EVENTS.CRITICAL_FINDING_DISCOVERED,
  SCAN_EVENTS.SYSTEM_LOAD_CHANGED,
  SCAN_EVENTS.QUEUE_UPDATED,
  SCAN_EVENTS.TELEMETRY_EVENT,
].forEach((eventName) => {
  registerTelemetryEvent(eventName);
});
}

export function destroyTelemetryEmitter() {
  registeredUnsubscribers.forEach((unsubscribe) => {
    unsubscribe();
  });

  registeredUnsubscribers.length = 0;
}
