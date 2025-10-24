"use client";
import ModalEpubConfig from "@/components/Modals/ModalConfigEpub/ModalConfigEpub";
import { useReaderConfig } from "@/hooks/useReaderConfig";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiChevronLeft, HiDotsVertical } from "react-icons/hi";
import { MdMenuBook } from "react-icons/md";
import type { IReactReaderStyle } from "react-reader";
import { ReactReaderStyle } from "react-reader";
import { useRouter, useSearchParams } from "next/navigation";
import AdBanner from "@/components/ADS/AdBanner";
import AdBannerMobile from "@/components/ADS/AdsBannerMobile";
import AutorInfo from "@/components/AutorInfo/AutorInfo";
import { useFetchBook } from "@/hooks/useFetchBook";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import { addEpubProgress } from "@/hooks/addEpubProgress";
import { getEpubProgress } from "@/hooks/getEpubProgress";
import useAuth from "@/hooks/useAuth";

const ReactReader = dynamic(() => import("react-reader").then(m => m.ReactReader), { ssr: false });

interface PageData {
    currentPage: number;
    totalPages: number;
    percentage: number;
}

export default function EpubReaderPage() {

    const searchParams = useSearchParams();
    const bookId = searchParams.get("bookId");
    const { book, isLoading, error } = useFetchBook(bookId ?? "");

    const isAuth = useAuth();
    const router = useRouter();

    const [bookUrl, setBookUrl] = useState<string>("");
    const [location, setLocation] = useState<string | number>(0);
    const [rendition, setRendition] = useState<any>(null);
    const [toc, setToc] = useState<any[]>([]);
    const [openToc, setOpenToc] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isModalConfigOpen, setIsModalConfigOpen] = useState(false);
    const [pageData, setPageData] = useState<PageData | null>(null);
    const [locationsReady, setLocationsReady] = useState(false);
    const [isReaderConfigReady, setIsReaderConfigReady] = useState(false); 

    const { fontSizeEpub, background } = useReaderConfig();

    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const backgroundClass = useMemo(() => {
        if (!mounted) return ""; 
        switch (background) {
            case 'dark':
                return 'bg-black text-white';
            case 'light':
                return 'bg-white text-zinc-900';
            case 'sepia':
                return 'bg-sepia text-zinc-900';
            default:
                return '';
        }
    }, [background, mounted]);

    useEffect(() => {
        setIsReaderConfigReady(true);
    }, []);

    const isDark = background === 'dark';
    const isLight = background === 'light';
    const isSepia = background === 'sepia';

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

    useEffect(() => {
        if (error) {
            router.push('/')
        }
        setBookUrl(book?.epub ?? "");
    }, [book?.epub, isLoading, book, router, error]);

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

    useEffect(() => {
        let didCancel = false;

        (async () => {
            if (!bookId || !isAuth) return;

            try {
                const response = await getEpubProgress(bookId);
                const data = response.data;
                
                if (!didCancel && data?.cfi && typeof data.cfi === "string") {
                    setLocation(data.cfi);
                }
            } catch (e) {
                console.warn("[EPUB] Falha ao carregar CFI da API:", e);
            }
        })();

        return () => {
            didCancel = true;
        };
    }, [bookId, isAuth]);

    const onLocationChanged = useCallback(
        (loc: string) => {
            setLocation(loc);
            if (!locationsReady || typeof loc !== "string") return;
            computeFromCfi(rendition, loc);
        },
        [rendition, locationsReady, computeFromCfi]
    );

    const applyThemeToRendition = useCallback((r: any, b: string, f: number) => {
        const isDark = b === 'dark';
        const isLight = b === 'light';
        
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
        }
    }, []);

    const onRendition = useCallback(
        (r: any) => {
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
                .catch((err: any) => {
                    console.error("Erro ao gerar as localizações:", err);
                });
        },
        [location, computeFromCfi, background, fontSizeEpub, applyThemeToRendition] 
    );

    useEffect(() => {
        if (locationsReady && typeof location === "string" && rendition) {
            computeFromCfi(rendition, location);
        }
    }, [locationsReady, location, rendition, computeFromCfi]);

    useEffect(() => {
        if (rendition) {
            applyThemeToRendition(rendition, background, fontSizeEpub);
        }
    }, [fontSizeEpub, background, rendition, applyThemeToRendition]);

    useEffect(() => {
        if (!bookId) return;
        if (!isAuth) return;

        const save = () => {
            addEpubProgress(
                bookId ?? "",
                Math.max(0, Math.min(100, Math.round(((pageData?.percentage ?? 0) as number) * 100))),
                typeof location === "string" ? location : undefined
            );
        };

        const onBeforeUnload = (e: BeforeUnloadEvent) => {
            save();
            e.preventDefault();
            e.returnValue = "";
        };

        const onPageHide = () => {
            save();
        };

        const onVisibilityChange = () => {
            if (document.visibilityState === "hidden") save();
        };

        const onPopState = () => {
            save();
        };

        window.addEventListener("beforeunload", onBeforeUnload);
        window.addEventListener("pagehide", onPageHide);
        document.addEventListener("visibilitychange", onVisibilityChange);
        window.addEventListener("popstate", onPopState);

        return () => {
            window.removeEventListener("beforeunload", onBeforeUnload);
            window.removeEventListener("pagehide", onPageHide);
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.removeEventListener("popstate", onPopState);
        };
    }, [bookId, location, pageData?.percentage, isAuth]);

    const Toolbar = useMemo(
        () => {
            const progress = locationsReady && pageData ? Math.round(pageData.percentage * 100).toString() : '';
            const percentageDisplay = locationsReady && pageData ? ` | ${progress}%` : '';

            if (!book?.epub || isLoading)
                return <FullScreenLoader label="Carregando EPUB" />;

            return (
                <div className="sticky top-0 z-10 w-full border-b border-zinc-800/20 bg-gray-800 backdrop-blur">
                    <div className="mx-auto flex max-w-5xl items-center gap-2 p-2 bg-gray-800">
                        <a
                            onClick={async () => {
                                try {
                                    if (isAuth) {
                                        await addEpubProgress(
                                            bookId ?? "",
                                            Math.max(0, Math.min(100, Math.round(((pageData?.percentage ?? 0) as number) * 100))),
                                            typeof location === "string" ? location : undefined
                                        );
                                    }
                                } catch (e) {
                                    console.error("Erro ao salvar progresso antes de voltar:", e);
                                }

                                router.push(`/livro?bookId=${bookId}`)

                            }}
                            className="bg-gray-700 cursor-pointer rounded-full text-white lg:px-4 p-2 flex gap-2 justify-center items-center"
                        >
                            <HiChevronLeft />
                            <p className="hidden lg:block font-lexend text-sm font-normal">Voltar</p>
                        </a>

                        <button
                            onClick={() => setOpenToc((v) => !v)}
                            className="rounded-full px-3 py-2 text-sm bg-gray-700 flex justify-center items-center gap-3 font-normal text-white font-lexend "
                        >
                            <MdMenuBook /> Sumário
                        </button>

                        <div className="ml-auto flex items-center gap-2">
                            {locationsReady && pageData && (
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
        },
        [pageData, locationsReady, isAuth, isLoading, book?.epub, bookId, location, router]
    );

    return (
        <div ref={containerRef} className={`flex min-h-screen w-full flex-col ${backgroundClass}`} suppressHydrationWarning>
            {Toolbar}
            <div className={`mx-auto grid w-full max-w-5xl grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] ${backgroundClass}`} suppressHydrationWarning>
                <aside
                    className={`border-r border-zinc-800/10 p-3 font-bold md:block ${openToc ? "block" : "hidden"
                        }`}
                >
                    <ol className="space-y-1 text-sm">
                        {toc.map((item: any) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => {
                                        try {
                                            containerRef.current?.scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                            });

                                            rendition?.display(item.href);
                                        } catch {
                                        }
                                        setOpenToc(false);
                                    }}
                                    className="w-full rounded-lg px-2 py-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ol>
                </aside>

                <main className="min-h-[70vh]">
                    <div className="h-[calc(100vh-56px)] w-full md:h-[calc(100vh-64px)]">
                        <AdBanner
                            dataAdFormat=""
                            dataFullWidthResponsive={false}
                            dataAdSlot="3946512730"
                            customClassName="mt-4"
                        />
                        <AdBannerMobile dataAdSlot="6603126932" customClassName="mt-4" />

                        {isReaderConfigReady ? (
                            <ReactReader
                                key={`reader-${background}`} 
                                url={bookUrl}
                                location={location}
                                locationChanged={onLocationChanged}
                                getRendition={onRendition}
                                epubOptions={{ flow: "paginated" }}
                                showToc={false}
                                readerStyles={READER_STYLES}
                                loadingView={<></>}
                            />
                        ) : (
                            <div className={`w-full h-full flex items-center justify-center ${backgroundClass}`}>
                                <FullScreenLoader label="Ajustando tema..." />
                            </div>
                        )}

                        <AdBanner
                            dataAdFormat=""
                            dataFullWidthResponsive={false}
                            dataAdSlot="2423907456"
                            customClassName="mb-4"
                        />
                        <AdBanner dataAdSlot="2423907456" fixed />
                        <AdBannerMobile dataAdSlot="6603126932" fixed />
                        <AutorInfo title={book?.titulo ?? ''} autor={book?.autor ?? ''} license={book?.epubInfo?.license} licenseLink={book?.epubInfo?.licenseLink} modified={book?.epubInfo?.modified} font={book?.epubInfo?.font} fontLink={book?.epubInfo?.fontLink}  />

                    </div>
                </main>

                <ModalEpubConfig
                    isOpen={isModalConfigOpen}
                    onRequestClose={() => {
                        setIsModalConfigOpen(false);
                    }}
                />
            </div>
        </div>
    );
}
