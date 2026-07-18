import { useContext } from "react";

import FindingsContext from "../contexts/FindingsContext";

export default function useFindings() {
  const context = useContext(FindingsContext);

  if (!context) {
    throw new Error("useFindings must be used within a FindingsProvider.");
  }

  return context;
}
