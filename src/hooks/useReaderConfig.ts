import { ReaderConfigContext } from "@/context/ReaderConfiContext";
import { useContext } from "react";

export function useReaderConfig() {
  const ctx = useContext(ReaderConfigContext);
  if (!ctx) throw new Error("User Reader Config Error");
  return ctx;
}
