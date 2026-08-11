"use client";
import ModalEpubConfig from "@/components/Modals/ModalConfigEpub/ModalConfigEpub";
import { useReaderConfig } from "@/hooks/useReaderConfig";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiChevronLeft, HiDotsVertical } from "react-icons/hi";
import { MdInfoOutline, MdMenuBook } from "react-icons/md";
import type { IReactReaderStyle } from "react-reader";
import { ReactReaderStyle } from "react-reader";
import { useRouter, useSearchParams } from "next/navigation";
import AdBanner from "@/components/ADS/AdBanner";
import AdBannerMobile from "@/components/ADS/AdsBannerMobile";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import { addEpubProgress } from "@/hooks/addEpubProgress";
import { getEpubProgress } from "@/hooks/getEpubProgress";
import useAuth from "@/hooks/useAuth";
import ModalToc from "@/components/Modals/TocModal/TocModal";
import ModalInfo from "@/components/Modals/ModalInfo/ModalInfo";
import AdResponsive from "@/components/ADS/AdResponsive";
import { useFetchBookBySlug } from "@/hooks/useFetchBookBySlug";
import Metadata from "@/components/Metadata";

const ReactReader = dynamic(() => import("react-reader").then(m => m.ReactReader), { ssr: false });

interface PageData {
    currentPage: number;
    totalPages: number;
    percentage: number;
}

/** 🔧 Hook para travar um 100vh estável em webviews (Instagram, etc.) */
function useStableVhForIG() {
    useEffect(() => {
        const setVh = () => {
            const vh = (window.visualViewport?.height ?? window.innerHeight) * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        };
        setVh();
        const t1 = setTimeout(setVh, 250);
        const t2 = setTimeout(setVh, 750);
        const onOrient = () => setVh();
        window.addEventListener("orientationchange", onOrient);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            window.removeEventListener("orientationchange", onOrient);
        };
    }, []);
}

export default function EpubReaderPage({ params }: { params: { slug: string } }) {
    useStableVhForIG();

    const searchParams = useSearchParams();
    const slug = params?.slug as string;
    const { book, isLoading, error } = useFetchBookBySlug(slug);

    const isAuth = useAuth();
    const router = useRouter();

    const [bookUrl, setBookUrl] = useState<string>("");
    const [location, setLocation] = useState<string | number | null>(null);
    const [rendition, setRendition] = useState<any>(null);
    const [toc, setToc] = useState<any[]>([]);
    const [openToc, setOpenToc] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isModalConfigOpen, setIsModalConfigOpen] = useState(false);
    const [pageData, setPageData] = useState<PageData | null>(null);
    const [locationsReady, setLocationsReady] = useState(false);
    const [isReaderConfigReady, setIsReaderConfigReady] = useState(false);
    const [initialCfiDisplayed, setInitialCfiDisplayed] = useState(false);
    const [isAutorInfoOpen, setIsAutorInfoOpen] = useState(false);
    const [saveLocation, setSaveLocation] = useState<string | null>(null);
    const [initialCfi, setInitialCfi] = useState<string | null>(null);


    const { fontSizeEpub, background } = useReaderConfig();

    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

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

    useEffect(() => {
        setIsReaderConfigReady(true);
    }, []);

    const isDark = background === "dark";
    const isLight = background === "light";
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
        titleArea: { ...ReactReaderStyle.titleArea, display: "none" },
        tocArea: { ...ReactReaderStyle.tocArea, display: "none" },
        tocBackground: { ...ReactReaderStyle.tocBackground, display: "none" },
        arrow: {
            ...ReactReaderStyle.arrow,
            color: isDark ? "#ffffff" : "#000000",
            opacity: 1,
        },
    };

    useEffect(() => {
        if (error) {
            router.push("/");
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
          

            if (!book?._id || !isAuth) {
             
                if (!didCancel && location === null) {
                    setLocation(0);
                }
                return;
            }

            try {
               
                const data = await getEpubProgress(book._id);
               

                if (!didCancel && data?.cfi && typeof data.cfi === "string") {
                    setInitialCfi(data.cfi);
                    setLocation(data.cfi);
                } else if (!didCancel && location === null) {
                    setLocation(0);
                }
            } catch (e) {
                console.warn("[EPUB] Falha ao carregar CFI da API:", e);
                if (!didCancel && location === null) {
                    setLocation(0);
                }
            }
        })();

        return () => { didCancel = true; };
    }, [book?._id, isAuth]);

    const saveEpubProgress = useCallback(async () => {

        if (!isAuth) return;
        if (!book?._id) return;
        if (typeof location !== "string") return;

        try {
            let percentage = 0;

            if (rendition?.book?.locations?.percentageFromCfi) {
                percentage = rendition.book.locations.percentageFromCfi(location);
            } else if (pageData?.percentage) {
                percentage = pageData.percentage;
            }


            await addEpubProgress(
                book._id,
                Math.max(0, Math.min(100, Math.round(percentage * 100))),
                location
            );
        } catch (e) {
            console.error("Erro ao salvar progresso EPUB:", e);
        }
    }, [isAuth, book?._id, location, rendition, pageData?.percentage]);

    useEffect(() => {
        if (!isAuth) return;

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            saveEpubProgress();
            event.preventDefault();
            event.returnValue = "";
        };

        const handlePopState = () => {
            saveEpubProgress();
        };

        const handlePageHide = () => {
            saveEpubProgress();
        };




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
        if (!book?._id) return;
        if (!saveLocation) return;
        if (!rendition?.book?.locations?.percentageFromCfi) return;

        const timeout = setTimeout(() => {
            const percentage = rendition.book.locations.percentageFromCfi(saveLocation);

            addEpubProgress(
                book._id,
                Math.max(0, Math.min(100, Math.round(percentage * 100))),
                saveLocation
            );
        }, 2000);

        return () => clearTimeout(timeout);
    }, [saveLocation, isAuth, book?._id, rendition]);

    const onLocationChanged = useCallback(
        (loc: string) => {
            if (typeof loc !== "string") return;

            setLocation(loc);
            setSaveLocation(loc);

            if (locationsReady) {
                computeFromCfi(rendition, loc);
            }
        },
        [rendition, locationsReady, computeFromCfi]
    );

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
                    lineHeight: "1.8",
                    fontWeight: "400",
                },
                a: { color: linkColor },
                "h1,h2,h3": { color: textColor },
                "a:hover": {
                    color: textColor,
                    textDecoration: "none",
                },

                "a:focus": {
                    outline: "none",
                },

                "a:active": {
                    color: textColor,
                },
            });

            r.themes.fontSize(`${f}%`);
            r.views().forEach((view: any) => view.pane && view.pane.render());
        } catch (e) {
            console.warn("Erro ao aplicar tema:", e);
        }
    }, []);

    const onRendition = useCallback(
        (r: any) => {
            setRendition(r);
            setLocationsReady(false);

            applyThemeToRendition(r, background, fontSizeEpub);

            r.book.loaded.navigation.then((nav: any) => setToc(nav.toc || []));

            r.on("relocated", (loc: any) => {
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
                            setInitialCfiDisplayed(true);
                        } catch (e) {
                            console.error("Erro ao abrir no CFI salvo:", e);
                        }
                    }
                })
                .catch((err: any) => {
                    console.error("Erro ao gerar as localizações:", err);
                });
        },
        [location, computeFromCfi, background, fontSizeEpub, applyThemeToRendition]
    );

    useEffect(() => {
        if (rendition) {
            applyThemeToRendition(rendition, background, fontSizeEpub);
        }
    }, [fontSizeEpub, background, rendition, applyThemeToRendition]);

    const handleBack = useCallback(async () => {

        try {
            if (isAuth) {
                await saveEpubProgress();
            }
        } catch (e) {
            console.error("Erro ao salvar progresso antes de voltar:", e);
        }

        router.push(`/${book?.slug}`);
    }, [isAuth, saveEpubProgress, router, book?.slug]);





    const Toolbar = useMemo(() => {
        const progress = locationsReady && pageData ? Math.round(pageData.percentage * 100).toString() : "";
        const percentageDisplay = locationsReady && pageData ? ` | ${progress}%` : "";

        if (!book?.epub || isLoading || (location === null))
            return <FullScreenLoader label={isLoading ? "Carregando EPUB" : "Aguardando progresso..."} />;

        return (
            <div className="sticky top-0 z-10 w-full border-b border-zinc-800/20 bg-black backdrop-blur">
                <div className="mx-auto flex max-w-5xl justify-between items-center gap-2 p-2 pb-22">
                    <div className=" flex justify-center items-center gap-2">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="bg-gray-800 cursor-pointer rounded-full text-white lg:px-4 p-2 flex gap-2 justify-center items-center"
                        >
                            <HiChevronLeft />
                            <p className="hidden lg:block font-lexend text-sm font-normal">Voltar</p>
                        </button>
                        {toc.length > 1 && <button
                            onClick={() => setOpenToc((v) => !v)}
                            className="rounded-full lg:px-4 p-2 text-sm bg-gray-800 flex justify-center items-center gap-3 font-normal text-white font-lexend "
                        >
                            <MdMenuBook /> <span className="hidden md:block">Sumário</span>
                        </button>}
                    </div>

                    <div className=" flex flex-col jusitfy-center items-center gap-2">
                        {locationsReady && pageData && (
                            <div className="w-full h-1 bg-gray-800">
                                <div
                                    className="h-1 bg-main-500 transition-all duration-300"
                                    style={{ width: `${Math.round(pageData.percentage * 100)}%` }}
                                />
                            </div>
                        )}
                        {locationsReady && pageData && (
                            <div className="text-white text-sm font-lexend opacity-80 font-normal">
                                {`Posição ${pageData.currentPage} de ${pageData.totalPages}${percentageDisplay}`}
                            </div>
                        )}
                    </div>




                    <div className="flex items-center gap-2">

                        <button
                            onClick={() => setIsAutorInfoOpen(true)}
                            className="bg-gray-800 text-white lg:px-4 p-2 rounded-full flex gap-2 justify-center items-center"
                        >
                            <p className="hidden lg:block font-lexend text-sm font-normal">Informações</p>
                            <MdInfoOutline />
                        </button>
                        <button
                            onClick={() => setIsModalConfigOpen(true)}
                            className="bg-gray-800 text-white lg:px-4 p-2 rounded-full flex gap-2 justify-center items-center"
                        >
                            <p className="hidden lg:block font-lexend text-sm font-normal">Configurações</p>
                            <HiDotsVertical />
                        </button>
                    </div>
                </div>
            </div >
        );
    }, [pageData, locationsReady, isAuth, isLoading, book?.epub, book && book._id, location, router]);


    return (
        <>
            <Metadata
                seoTitle={
                    book
                        ? `${book.titulo} - ${book.autor} EPUB Grátis`
                        : "Livros Gratuitos EPUB Grátis"
                }
                seoDescription={
                    book
                        ? `${book.descricao} EPUB Grátis`
                        : "Livros Gratuitos EPUB Grátis"
                }
            />
            <div ref={containerRef} className={`flex min-h-screen w-full flex-col ${backgroundClass}`} suppressHydrationWarning>
                {Toolbar}
                <ModalToc
                    isOpen={openToc}
                    onRequestClose={() => setOpenToc(false)}
                    toc={toc}
                    onSelectItem={(href) => {
                        try {
                            rendition?.book?.spine?.each((item: any) => {
                                if (item.href.includes(href) || href.includes(item.href)) {
                                    rendition?.display(item.index);
                                    return false;
                                }
                            });
                        } catch (e) {
                            console.warn("Erro ao navegar pelo TOC:", e);
                        }
                    }}
                />
                <ModalInfo
                    isOpen={isAutorInfoOpen}
                    onRequestClose={() => setIsAutorInfoOpen(false)}
                    title={book?.titulo ?? ""}
                    autor={book?.autor ?? ""}
                    license={book?.epubInfo?.license}
                    licenseLink={book?.epubInfo?.licenseLink}
                    modified={book?.epubInfo?.modified}
                    font={book?.epubInfo?.font}
                    fontLink={book?.epubInfo?.fontLink}
                />
                <div className={`mx-auto grid w-full max-w-5xl grid-cols-1  ${backgroundClass}`} suppressHydrationWarning>



                    <main className="min-h-[70vh]">
                        <div className="w-full overscroll-contain touch-pan-y">

                            <AdBanner
                                dataAdFormat=""
                                dataFullWidthResponsive={false}
                                dataAdSlot="3946512730"
                                customClassName="mt-4"
                            />
                            <AdBannerMobile dataAdSlot="6603126932" customClassName="mt-4" />

                            {isReaderConfigReady && bookUrl && location !== null ? (
                                <div style={{ height: "calc(var(--vh, 1vh) * 100 - 56px - 90px)" }}>
                                    <ReactReader
                                        key={`reader-${(book && book._id) ?? "local"}`}
                                        url={bookUrl}
                                        location={location}
                                        locationChanged={onLocationChanged}
                                        getRendition={onRendition}
                                        epubOptions={{ flow: "paginated", spread: "none" }}
                                        showToc={false}
                                        readerStyles={READER_STYLES}
                                        loadingView={
                                            <div className="flex items-center justify-center">
                                                <div
                                                    className="w-10 h-10 border-4 border-main-500 border-t-transparent border-solid rounded-full animate-spin"
                                                    role="status"
                                                    aria-label="Loading"
                                                >
                                                    <span className="sr-only">Carregando...</span>
                                                </div>
                                            </div>
                                        }
                                        errorView={<></>}
                                    />
                                </div>
                            ) : (
                                <div
                                    className={`w-full flex items-center justify-center ${backgroundClass}`}
                                    style={{ height: "calc(var(--vh, 1vh) * 100 - 56px)" }}
                                >
                                    <FullScreenLoader label="Ajustando tema..." />
                                </div>
                            )}

                            <AdBanner
                                dataAdFormat=""
                                dataFullWidthResponsive={false}
                                dataAdSlot="2423907456"
                                customClassName="mb-4"
                            />
                            <AdResponsive dataAdSlot="1435361044" />
                            <div className="h-[90px] md:h-[90px]" aria-hidden="true" />
                            <AdBanner dataAdSlot="2423907456" fixed />
                            <AdBannerMobile dataAdSlot="6603126932" fixed />

                        </div>
                    </main>

                    <ModalEpubConfig
                        isOpen={isModalConfigOpen}
                        onRequestClose={() => { setIsModalConfigOpen(false); }}
                    />
                </div>
            </div>
        </>
    );
}
