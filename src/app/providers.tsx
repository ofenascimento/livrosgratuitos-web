"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BookProvider } from "@/context/BookContext";
import { ReaderConfigProvider } from "@/context/ReaderConfiContext";
import CookieBanner from "@/components/CookieBanner/CookieBanner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReaderConfigProvider>
        <BookProvider>
          {children}
          <CookieBanner />
        </BookProvider>
      </ReaderConfigProvider>
    </QueryClientProvider>
  );
}