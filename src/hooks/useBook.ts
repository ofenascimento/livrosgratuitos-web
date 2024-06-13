import { BookContext } from "@/context/BookContext";
import { useContext } from "react";

export function useBook() {
  const ctx = useContext(BookContext);
  return ctx;
}
