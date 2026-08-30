"use client";
import ModalEpubConfig from "@/components/Modals/ModalConfigEpub/ModalConfigEpub";
import { useReaderConfig } from "@/hooks/useReaderConfig";
import dynamic from "next/dynamic";
import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AdBanner from "@/components/ADS/AdBanner";
import AdBannerMobile from "@/components/ADS/AdsBannerMobile";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import useAuth from "@/hooks/useAuth";
import ModalToc from "@/components/Modals/TocModal/TocModal";
import ModalInfo from "@/components/Modals/ModalInfo/ModalInfo";
import AdResponsive from "@/components/ADS/AdResponsive";
import { useBookBySlug } from "@/hooks/useBooks";
import Metadata from "@/components/Metadata";
import { useEpubTheme } from "@/hooks/useEpubTheme";
import { useEpubRendition } from "@/hooks/useEpubRendition";
import { useEpubProgressPersistence } from "@/hooks/useEpubProgressPersistence";
import EpubReaderToolbar from "@/components/EpubReader/EpubReaderToolbar";

const ReactReader = dynamic(() => import("react-reader").then(m => m.ReactReader), { ssr: false });

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

export default function EpubReaderPage({ params }: { params: Promise<{ slug: string }> }) {
    useStableVhForIG();

    const { slug } = use(params);
    const { book, isLoading, error } = useBookBySlug(slug);

    const isAuth = useAuth();
    const router = useRouter();

    const [bookUrl, setBookUrl] = useState<string>("");
    const [toc, setToc] = useState<any[]>([]);
    const [openToc, setOpenToc] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isModalConfigOpen, setIsModalConfigOpen] = useState(false);
    const [isReaderConfigReady, setIsReaderConfigReady] = useState(false);
    const [isAutorInfoOpen, setIsAutorInfoOpen] = useState(false);

    const { fontSizeEpub, background } = useReaderConfig();

    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const { backgroundClass, READER_STYLES, applyThemeToRendition } = useEpubTheme(
        background,
        fontSizeEpub,
        mounted
    );

    const {
        location,
        saveLocation,
        rendition,
        toc: renditionToc,
        pageData,
        locationsReady,
        onLocationChanged,
        onRendition,
    } = useEpubRendition({
        bookId: book?._id,
        isAuth,
        background,
        fontSizeEpub,
        applyThemeToRendition,
    });

    const { saveEpubProgress } = useEpubProgressPersistence({
        bookId: book?._id,
        isAuth,
        location,
        rendition,
        pageData,
        saveLocation,
    });

    useEffect(() => {
        setIsReaderConfigReady(true);
    }, []);

    useEffect(() => {
        if (error) {
            router.push("/");
        }
        setBookUrl(book?.epub ?? "");
    }, [book?.epub, isLoading, book, router, error]);

    useEffect(() => {
        setToc(renditionToc);
    }, [renditionToc]);

    const handleBack = async () => {
        try {
            if (isAuth) {
                await saveEpubProgress();
            }
        } catch (e) {
            console.error("Erro ao salvar progresso antes de voltar:", e);
        }

        router.push(`/${book?.slug}`);
    };

    return (
        <>
            <Metadata
                seoTitle={
                    book
                        ? `${book.title} - ${book.author} EPUB Grátis`
                        : "Livros Gratuitos EPUB Grátis"
                }
                seoDescription={
                    book
                        ? `${book.description} EPUB Grátis`
                        : "Livros Gratuitos EPUB Grátis"
                }
            />
            <div ref={containerRef} className={`flex min-h-screen w-full flex-col ${backgroundClass}`} suppressHydrationWarning>
                <EpubReaderToolbar
                    hasEpub={!!book?.epub}
                    isLoading={isLoading}
                    location={location}
                    locationsReady={locationsReady}
                    pageData={pageData}
                    tocLength={toc.length}
                    onBack={handleBack}
                    onToggleToc={() => setOpenToc((v) => !v)}
                    onOpenAuthorInfo={() => setIsAutorInfoOpen(true)}
                    onOpenConfig={() => setIsModalConfigOpen(true)}
                />
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
                    title={book?.title ?? ""}
                    autor={book?.author ?? ""}
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
                                        getRendition={onRendition as any}
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