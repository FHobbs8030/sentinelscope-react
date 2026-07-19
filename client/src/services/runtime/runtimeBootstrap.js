import scanRuntimeEngine from "./scanRuntimeEngine";
import missionPersistenceReconciler from "../orchestration/missionPersistenceReconciler";

let runtimeBootstrapped = false;

export function bootstrapRuntime(runtimeScans) {
  if (runtimeBootstrapped) {
    return;
  }

  runtimeBootstrapped = true;

  scanRuntimeEngine.initialize(runtimeScans);
  scanRuntimeEngine.start();
  missionPersistenceReconciler.start();
}
