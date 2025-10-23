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

    const router = useRouter();

    const [bookUrl, setBookUrl] = useState<string>("");

    useEffect(() => {
        if(error) {
            router.push('/')
        }
        setBookUrl(book?.epub ?? "");
    }, [book?.epub, isLoading, book]);

    // 🌟 CORREÇÃO 1: Inicializa location com 0 no SSR para evitar erro de hidratação.
    const [location, setLocation] = useState<string | number>(0);
    const [isClient, setIsClient] = useState(false); // Estado para rastrear se estamos no cliente

    const [rendition, setRendition] = useState<any>(null);
    const [toc, setToc] = useState<any[]>([]);
    const [openToc, setOpenToc] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isModalConfigOpen, setIsModalConfigOpen] = useState(false);

    const [pageData, setPageData] = useState<PageData | null>(null);

    const { fontSizeEpub } = useReaderConfig();

    const READER_STYLES: IReactReaderStyle = {
        ...ReactReaderStyle,
        container: {
            ...ReactReaderStyle.container,
            backgroundColor: "#faf2e7",
        },
        readerArea: {
            ...ReactReaderStyle.readerArea,
            backgroundColor: "#faf2e7",
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
        setIsClient(true);

        if (typeof window !== "undefined") {
            const savedLocation = localStorage.getItem(`${bookId}:loc`) || 0;
            setLocation(savedLocation);
        }
    }, [bookId]);

    const onLocationChanged = useCallback(
        (loc: string) => {
            setLocation(loc);
            if (typeof window !== "undefined") localStorage.setItem(`${bookId}:loc`, loc);

            if (rendition && rendition.book?.locations && typeof loc === "string") {
                try {
                    const currentPageNumber = rendition.book.locations.locationFromCfi(loc);
                    const totalPages = rendition.book.locations.length();
                    const percentageProgress = rendition.book.locations.percentageFromCfi(loc);

                    if (currentPageNumber !== null) {
                        setPageData({
                            currentPage: currentPageNumber + 1,
                            totalPages: totalPages,
                            percentage: percentageProgress,
                        });
                    }
                } catch (e) {
                    console.error("Erro ao calcular a localização da página/porcentagem:", e);
                }
            }
        },
        [bookId, rendition]
    );

    const onRendition = useCallback(
        (r: any) => {
            setRendition(r);
            try {
                r.themes.default({
                    body: {
                        background: "#faf2e7",
                        color: "#2b2117",
                        lineHeight: "1.6",
                    },
                    a: { color: "#7a4d2a" },
                    "h1,h2,h3": { color: "#2b2117" },
                });

                r.themes.fontSize(`${fontSizeEpub}%`);
                r.book.loaded.navigation.then((nav: any) => setToc(nav.toc || []));

                r.book.ready
                    .then(() => r.book.locations.generate(1024))
                    .then(() => {
                        if (typeof location === "string" && r.book.locations) {
                            const initialLoc = r.book.locations.locationFromCfi(location);
                            const totalLoc = r.book.locations.length();
                            const percentageProgress = r.book.locations.percentageFromCfi(location);

                            if (initialLoc !== null) {
                                setPageData({
                                    currentPage: initialLoc + 1,
                                    totalPages: totalLoc,
                                    percentage: percentageProgress,
                                });
                            }
                        }
                    })
                    .catch((err: any) => {
                        console.error("Erro ao gerar as localizações:", err);
                    });
            } catch {
                // noop
            }
        },
        [fontSizeEpub, location]
    );

    useEffect(() => {
        if (rendition) {
            try {
                rendition.themes.fontSize(`${fontSizeEpub}%`);
            } catch {
                // noop
            }
        }
    }, [fontSizeEpub, rendition]);

    const Toolbar = useMemo(
        () => {
            const progress = pageData ? (pageData.percentage * 100).toFixed(0) : '';
            // Verifica se a porcentagem é um número válido antes de montar a string.
            const percentageDisplay = pageData && !isNaN(pageData.percentage) ? ` | ${progress}%` : '';

            if (!book?.epub || isLoading)
                return <FullScreenLoader label="Carregando EPUB" />;

            return (
                <div className="sticky top-0 z-10 w-full border-b border-zinc-800/20 bg-gray-800 backdrop-blur">
                    <div className="mx-auto flex max-w-5xl items-center gap-2 p-2 bg-gray-800">
                        <a
                            href={`/`}
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
                            {pageData && (
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
        [pageData]
    );

    return (
        <div ref={containerRef} className="flex min-h-screen w-full flex-col text-zinc-900 bg-sepia">
            {Toolbar}
            <div className="mx-auto grid w-full max-w-5xl grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] bg-sepia">
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

                        {/* 🌟 CORREÇÃO 3: Renderiza o leitor apenas no cliente */}
                        {isClient ? (
                            // @ts-ignore
                            <ReactReader
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
                            // Placeholder enquanto o livro carrega o estado do cliente
                            <div className="h-full w-full flex items-center justify-center text-gray-500">
                                Carregando livro...
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
                        <AutorInfo />

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