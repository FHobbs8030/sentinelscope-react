const missionQueue = [];

export function enqueueMission(mission) {
  missionQueue.push(mission);
}

export function dequeueMission() {
  return missionQueue.shift();
}

export function getMissionQueue() {
  return [...missionQueue];
}

export function clearMissionQueue() {
  missionQueue.length = 0;
}

export function getMissionQueueMetrics() {
  return {
    queued: missionQueue.length,
  };
}
