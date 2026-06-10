import scanRuntimeEngine from "./scanRuntimeEngine";

let runtimeBootstrapped = false;

export function bootstrapRuntime(runtimeScans) {
  if (runtimeBootstrapped) {
    return;
  }

  runtimeBootstrapped = true;

  scanRuntimeEngine.initialize(runtimeScans);
  scanRuntimeEngine.start();
}
