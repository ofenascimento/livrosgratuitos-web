"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { IReactReaderStyle } from "react-reader";
import { ReactReaderStyle } from "react-reader";
import { HiChevronLeft, HiDotsVertical } from "react-icons/hi";
import { MdMenuBook } from "react-icons/md";

import { useReaderConfig } from "@/hooks/useReaderConfig";
import ModalEpubConfig from "@/components/Modals/ModalConfigEpub/ModalConfigEpub";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";

const ReactReader = dynamic(() => import("react-reader").then(m => m.ReactReader), { ssr: false });

interface PageData {
  currentPage: number;
  totalPages: number;
  percentage: number;
}

export default function EpubReaderUploadPage() {
  const { fontSizeEpub, background } = useReaderConfig();

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const [location, setLocation] = useState<string | number>(0);
  const [rendition, setRendition] = useState<any>(null);
  const [toc, setToc] = useState<any[]>([]);
  const [openToc, setOpenToc] = useState(false);

  const [pageData, setPageData] = useState<PageData | null>(null);
  const [locationsReady, setLocationsReady] = useState(false);
  const [isModalConfigOpen, setIsModalConfigOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Tema de fundo da página (fora do iframe do ePub)
  const backgroundClass = useMemo(() => {
    if (!mounted) return "";
    switch (background) {
      case "dark":
        return "bg-black text-white";
      case "light":
        return "bg-white text-zinc-900";
      case "sepia":
        return "bg-sepia text-zinc-900";
      default:
        return "";
    }
  }, [background, mounted]);

  // Estilo do próprio ReactReader
  const isDark = background === "dark";
  const isSepia = background === "sepia";

  const READER_STYLES: IReactReaderStyle = {
    ...ReactReaderStyle,
    container: {
      ...ReactReaderStyle.container,
      backgroundColor: isSepia ? "#faf2e7" : isDark ? "#000000" : "#ffffff",
    },
    readerArea: {
      ...ReactReaderStyle.readerArea,
      backgroundColor: isSepia ? "#faf2e7" : isDark ? "#000000" : "#ffffff",
    },
    titleArea: {
      ...ReactReaderStyle.titleArea,
      display: "none",
    },
    tocArea: {
      ...ReactReaderStyle.tocArea,
      display: "none",
    },
    tocBackground: {
      ...ReactReaderStyle.tocBackground,
      display: "none",
    },
  };

  // Ao selecionar o arquivo local, criamos um Object URL
  const onPickFile = useCallback((file: File) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".epub")) {
      alert("Selecione um arquivo .epub");
      return;
    }
    // libera URL anterior
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    setFileName(file.name);
    setLocation(0);
    setPageData(null);
    setToc([]);
    setOpenToc(false);
  }, [fileUrl]);

  // Drag & drop
  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onPickFile(file);
  }, [onPickFile]);

  const computeFromCfi = useCallback((r: any, cfi: string) => {
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

  const onLocationChanged = useCallback((loc: string) => {
    setLocation(loc);
    if (!locationsReady || typeof loc !== "string") return;
    computeFromCfi(rendition, loc);
  }, [locationsReady, computeFromCfi, rendition]);

  const applyThemeToRendition = useCallback((r: any, b: string, f: number) => {
    const isDark = b === "dark";
    const isLight = b === "light";

    const bgColor = isDark ? "#000000" : isLight ? "#ffffff" : "#faf2e7";
    const textColor = isDark ? "#ffffff" : "#2b2117";
    const linkColor = isDark ? "#8cb4ff" : "#7a4d2a";

    try {
      r.themes.default({
        body: {
          background: bgColor,
          color: textColor,
          lineHeight: "1.6",
          fontWeight: "600",
        },
        a: { color: linkColor },
        "h1,h2,h3": { color: textColor },
      });
      r.themes.fontSize(`${f}%`);
      r.views().forEach((view: any) => view.pane && view.pane.render());
    } catch (e) {
      // noop
    }
  }, []);

  const onRendition = useCallback((r: any) => {
    setRendition(r);
    setLocationsReady(false);

    applyThemeToRendition(r, background, fontSizeEpub);

    r.book.loaded.navigation.then((nav: any) => setToc(nav.toc || []));

    r.book.ready
      .then(() => r.book.locations.generate(1024))
      .then(() => {
        setLocationsReady(true);
        if (typeof location === "string") {
          computeFromCfi(r, location);
        }
      })
      .catch((err: any) => console.error("Erro ao gerar as localizações:", err));
  }, [applyThemeToRendition, background, fontSizeEpub, computeFromCfi, location]);

  // Atualiza tema ao trocar preferências
  useEffect(() => {
    if (rendition) applyThemeToRendition(rendition, background, fontSizeEpub);
  }, [rendition, background, fontSizeEpub, applyThemeToRendition]);

  // Limpa Object URL ao desmontar
  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const Toolbar = useMemo(() => {
    const progress = locationsReady && pageData ? Math.round(pageData.percentage * 100).toString() : "";
    const percentageDisplay = locationsReady && pageData ? ` | ${progress}%` : "";

    return (
      <div className="sticky top-0 z-10 w-full border-b border-zinc-800/20 bg-gray-800 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-2 p-2 bg-gray-800">
          <button
            onClick={() => {
              // "Voltar": apenas limpar o arquivo e a leitura atual
              setFileUrl("");
              setFileName("");
              setLocation(0);
              setPageData(null);
              setToc([]);
              setOpenToc(false);
            }}
            className="bg-gray-700 cursor-pointer rounded-full text-white lg:px-4 p-2 flex gap-2 justify-center items-center"
          >
            <HiChevronLeft />
            <p className="hidden lg:block font-lexend text-sm font-normal">Voltar</p>
          </button>

          <button
            onClick={() => setOpenToc((v) => !v)}
            disabled={!fileUrl}
            className="rounded-full px-3 py-2 text-sm bg-gray-700 flex justify-center items-center gap-3 font-normal text-white font-lexend disabled:opacity-40"
          >
            <MdMenuBook /> Sumário
          </button>

          <div className="ml-auto flex items-center gap-2">
            {fileUrl && locationsReady && pageData && (
              <div className="text-white text-sm font-lexend ml-4 opacity-80 font-normal">
                {`Página ${pageData.currentPage} de ${pageData.totalPages}${percentageDisplay}`}
              </div>
            )}
            <button
              onClick={() => setIsModalConfigOpen(true)}
              className="bg-gray-700 text-white lg:px-4 p-2 rounded-full flex gap-2 justify-center items-center"
            >
              <p className="hidden lg:block font-lexend text-sm font-normal">Configurações</p>
              <HiDotsVertical />
            </button>
          </div>
        </div>
      </div>
    );
  }, [fileUrl, pageData, locationsReady]);

  return (
    <div ref={containerRef} className={`flex min-h-screen w-full flex-col ${backgroundClass}`} suppressHydrationWarning>
      {Toolbar}

      <div className={`mx-auto grid w-full max-w-5xl grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] ${backgroundClass}`} suppressHydrationWarning>
        {/* Sidebar / Sumário */}
        <aside className={`border-r border-zinc-800/10 p-3 font-bold md:block ${openToc ? "block" : "hidden"}`}>
          {!fileUrl && (
            <div className="text-sm opacity-70">Carregue um EPUB para ver o sumário.</div>
          )}
          {fileUrl && (
            <ol className="space-y-1 text-sm">
              {toc.map((item: any) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      try {
                        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                        rendition?.display(item.href);
                      } catch {}
                      setOpenToc(false);
                    }}
                    className="w-full rounded-lg px-2 py-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ol>
          )}
        </aside>

        {/* Main */}
        <main className="min-h-[70vh]">
          <div className="h-[calc(100vh-56px)] w-full md:h-[calc(100vh-64px)]">
            {!fileUrl ? (
              <div className="flex h-full w-full items-center justify-center">
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                  className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-400/50 p-10 text-center hover:border-zinc-400"
                >
                  <span className="text-base font-lexend mb-2">Arraste e solte seu arquivo .epub aqui</span>
                  <span className="text-sm opacity-70 mb-4">ou clique para selecionar</span>
                  <input
                    type="file"
                    accept=".epub,application/epub+zip"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onPickFile(f);
                    }}
                  />
                </label>
              </div>
            ) : (
              <>
                {/* Nome do arquivo carregado */}
                <div className="px-4 pt-3 text-sm opacity-70">
                  Lendo: <span className="font-medium">{fileName}</span>
                </div>

                {/* Leitor */}
                <div className="h-[calc(100%-40px)]">
                  <ReactReader
                    key={`reader-${background}-${fileName}`}
                    url={fileUrl}
                    location={location}
                    locationChanged={onLocationChanged}
                    getRendition={onRendition}
                    epubOptions={{ flow: "paginated" }}
                    showToc={false}
                    readerStyles={READER_STYLES}
                    loadingView={
                      <div className="w-full h-full flex items-center justify-center">
                        <FullScreenLoader label="Carregando EPUB..." />
                      </div>
                    }
                  />
                </div>
              </>
            )}
          </div>
        </main>

        <ModalEpubConfig
          isOpen={isModalConfigOpen}
          onRequestClose={() => setIsModalConfigOpen(false)}
        />
      </div>
    </div>
  );
}
