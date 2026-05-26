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

  Object.values(SCAN_EVENTS).forEach((eventName) => {
    registerTelemetryEvent(eventName);
  });
}

export function destroyTelemetryEmitter() {
  registeredUnsubscribers.forEach((unsubscribe) => {
    unsubscribe();
  });

  registeredUnsubscribers.length = 0;
}
