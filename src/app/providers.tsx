"use client";
import { BookProvider } from "@/context/BookContext";
import { ReaderConfigProvider } from "@/context/ReaderConfiContext";
import CookieBanner from "@/components/CookieBanner/CookieBanner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReaderConfigProvider>
      <BookProvider>
        {children}
        <CookieBanner />
      </BookProvider>
    </ReaderConfigProvider>
  );
}