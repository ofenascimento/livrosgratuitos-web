"use client";
import { useCallback, useEffect, useState } from "react";
import { readingProgressService } from "@/services/readingProgress.service";
import type { EpubRendition, EpubNavItem } from "@/types/epubjs";

interface PageData {
  currentPage: number;
  totalPages: number;
  percentage: number;
}

interface EpubNavigation {
  toc: EpubNavItem[];
}

interface EpubLocation {
  start?: {
    cfi?: string;
  };
}

interface UseEpubRenditionParams {
  bookId: string | undefined;
  isAuth: boolean | undefined;
  background: string;
  fontSizeEpub: number;
  applyThemeToRendition: (r: EpubRendition, b: string, f: number) => void;
}

export function useEpubRendition({
  bookId,
  isAuth,
  background,
  fontSizeEpub,
  applyThemeToRendition,
}: UseEpubRenditionParams) {
  const [location, setLocation] = useState<string | number | null>(null);
  const [saveLocation, setSaveLocation] = useState<string | null>(null);
  const [initialCfi, setInitialCfi] = useState<string | null>(null);
  const [rendition, setRendition] = useState<EpubRendition | null>(null);
  const [toc, setToc] = useState<EpubNavItem[]>([]);
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [locationsReady, setLocationsReady] = useState(false);

  useEffect(() => {
    let didCancel = false;

    (async () => {
      if (!bookId || !isAuth) {
        if (!didCancel && location === null) setLocation(0);
        return;
      }

      try {
        const data = await readingProgressService.getProgress(bookId);

        if (!didCancel && data?.currentCfi && typeof data.currentCfi === "string") {
          setInitialCfi(data.currentCfi);
          setLocation(data.currentCfi);
        } else if (!didCancel && location === null) {
          setLocation(0);
        }
      } catch (e) {
        console.warn("[EPUB] Falha ao carregar CFI da API:", e);
        if (!didCancel && location === null) setLocation(0);
      }
    })();

    return () => {
      didCancel = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, isAuth]);

  const computeFromCfi = useCallback((r: EpubRendition, cfi: string) => {
    if (!r?.book?.locations || !r.book.locations.length()) return;
    try {
      const currentPageNumber = r.book.locations.locationFromCfi(cfi);
      const totalPages = r.book.locations.length();
      const percentageProgress = r.book.locations.percentageFromCfi(cfi);

      if (currentPageNumber !== null) {
        setPageData({
          currentPage: currentPageNumber + 1,
          totalPages,
          percentage: percentageProgress,
        });
      }
    } catch (e) {
      console.error("Erro ao calcular pageData:", e);
    }
  }, []);

  const onLocationChanged = useCallback(
    (loc: string) => {
      if (typeof loc !== "string") return;

      setLocation(loc);
      setSaveLocation(loc);

      if (locationsReady && rendition) {
        computeFromCfi(rendition, loc);
      }
    },
    [rendition, locationsReady, computeFromCfi]
  );

  const onRendition = useCallback(
    (r: EpubRendition) => {
      setRendition(r);
      setLocationsReady(false);

      applyThemeToRendition(r, background, fontSizeEpub);

      r.book.loaded.navigation.then((nav: EpubNavigation) => setToc(nav.toc || []));

      r.on("relocated", (loc: EpubLocation) => {
        const cfi = loc?.start?.cfi;
        if (cfi && typeof cfi === "string") {
          setLocation(cfi);
          setSaveLocation(cfi);
          if (r.book?.locations?.length()) computeFromCfi(r, cfi);
        }
      });

      r.book.ready
        .then(() => r.book.locations.generate(1024))
        .then(async () => {
          setLocationsReady(true);

          if (initialCfi) {
            try {
              await r.display(initialCfi);
              setLocation(initialCfi);
              setSaveLocation(initialCfi);
            } catch (e) {
              console.error("Erro ao abrir no CFI salvo:", e);
            }
          }
        })
        .catch((err: unknown) => {
          console.error("Erro ao gerar as localizações:", err);
        });
    },
    [computeFromCfi, background, fontSizeEpub, applyThemeToRendition, initialCfi]
  );

  useEffect(() => {
    if (rendition) {
      applyThemeToRendition(rendition, background, fontSizeEpub);
    }
  }, [fontSizeEpub, background, rendition, applyThemeToRendition]);

  return {
    location,
    saveLocation,
    rendition,
    toc,
    pageData,
    locationsReady,
    onLocationChanged,
    onRendition,
  };
}