const missionStore = {
  missions: [],

  subscribers: new Set(),

  addMission(mission) {
    this.missions.unshift(mission);

    this.notifySubscribers();
  },

  updateMission(id, updates) {
    this.missions = this.missions.map((mission) =>
      mission.id === id
        ? {
            ...mission,
            ...updates,
          }
        : mission,
    );

    this.notifySubscribers();
  },

  getMissions() {
    return [...this.missions];
  },

  getMission(id) {
    return this.missions.find((mission) => mission.id === id) ?? null;
  },

  subscribe(callback) {
    this.subscribers.add(callback);

    return () => {
      this.subscribers.delete(callback);
    };
  },

  notifySubscribers() {
    const missions = this.getMissions();

    this.subscribers.forEach((callback) => {
      try {
        callback(missions);
      } catch (error) {
        console.error("[MissionStore] Failed notifying subscriber", error);
      }
    });
  },

  clear() {
    this.missions = [];

    this.notifySubscribers();
  },
};

export default missionStore;
