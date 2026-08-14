"use client";
import { useCallback, useEffect } from "react";
import { useSaveProgress } from "@/hooks/useReadingProgress";

interface PageData {
  percentage: number;
}

interface UseEpubProgressPersistenceParams {
  bookId: string | undefined;
  isAuth: boolean | undefined;
  location: string | number | null;
  rendition: any;
  pageData: PageData | null;
  saveLocation: string | null;
}

export function useEpubProgressPersistence({
  bookId,
  isAuth,
  location,
  rendition,
  pageData,
  saveLocation,
}: UseEpubProgressPersistenceParams) {
  const saveProgress = useSaveProgress();

  const saveEpubProgress = useCallback(async () => {
    if (!isAuth) return;
    if (!bookId) return;
    if (typeof location !== "string") return;

    try {
      let percentage = 0;

      if (rendition?.book?.locations?.percentageFromCfi) {
        percentage = rendition.book.locations.percentageFromCfi(location);
      } else if (pageData?.percentage) {
        percentage = pageData.percentage;
      }

      saveProgress.mutate({
        livroId: bookId,
        progressPercentage: Math.max(0, Math.min(100, Math.round(percentage * 100))),
        currentCfi: location,
      });
    } catch (e) {
      console.error("Erro ao salvar progresso EPUB:", e);
    }
  }, [isAuth, bookId, location, rendition, pageData?.percentage, saveProgress]);

  useEffect(() => {
    if (!isAuth) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      saveEpubProgress();
      event.preventDefault();
      event.returnValue = "";
    };
    const handlePopState = () => saveEpubProgress();
    const handlePageHide = () => saveEpubProgress();

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [isAuth, saveEpubProgress]);

  useEffect(() => {
    if (!isAuth) return;
    if (!bookId) return;
    if (!saveLocation) return;
    if (!rendition?.book?.locations?.percentageFromCfi) return;

    const timeout = setTimeout(() => {
      const percentage = rendition.book.locations.percentageFromCfi(saveLocation);

      saveProgress.mutate({
        livroId: bookId,
        progressPercentage: Math.max(0, Math.min(100, Math.round(percentage * 100))),
        currentCfi: saveLocation,
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [saveLocation, isAuth, bookId, rendition, saveProgress]);

  return { saveEpubProgress };
}