"use client";
import ModalEpubConfig from "@/components/Modals/ModalConfigEpub/ModalConfigEpub";
import { useReaderConfig } from "@/hooks/useReaderConfig";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiChevronLeft, HiDotsVertical } from "react-icons/hi";
import { MdMenuBook } from "react-icons/md";
import type { IReactReaderStyle } from "react-reader";
import { ReactReaderStyle } from "react-reader";
import { useSearchParams } from "next/navigation"; // 💡 Importação Adicionada
import AdBanner from "@/components/ADS/AdBanner";
import AdBannerMobile from "@/components/ADS/AdsBannerMobile";

const ReactReader = dynamic(() => import("react-reader").then(m => m.ReactReader), { ssr: false });

// 🚨 Interface Props Removida (Causa do erro de compilação)
// type Props = {
//   initialUrl?: string;
//   bookId?: string;
// };

interface PageData {
    currentPage: number;
    totalPages: number;
}

// 💡 Componente não aceita mais props customizadas diretamente
export default function EpubReaderPage() {

    // 💡 NOVO: Obtendo bookId e url dos parâmetros de busca da URL
    const searchParams = useSearchParams();
    const initialUrlFromQuery = searchParams.get("url");
    // Se 'bookId' não estiver na URL, usa "mock-book" como fallback
    const bookId = searchParams.get("bookId") || "mock-book";

    const defaultUrl =
        initialUrlFromQuery ||
        "https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/epub%2Feu.epub?alt=media&token=a41db6b9-9ee1-4f68-b894-c2994bd6d8c5";

    const [bookUrl] = useState<string>(defaultUrl);

    const [location, setLocation] = useState<string | number>(
        // Usa o bookId obtido da URL para carregar/salvar no localStorage
        typeof window !== "undefined" ? localStorage.getItem(`${bookId}:loc`) || 0 : 0
    );

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

    const onLocationChanged = useCallback(
        (loc: string) => {
            setLocation(loc);
            if (typeof window !== "undefined") localStorage.setItem(`${bookId}:loc`, loc);

            if (rendition && rendition.book?.locations && typeof loc === "string") {
                try {
                    const currentPageNumber = rendition.book.locations.locationFromCfi(loc);
                    const totalPages = rendition.book.locations.length();

                    if (currentPageNumber !== null) {
                        setPageData({
                            currentPage: currentPageNumber + 1,
                            totalPages: totalPages,
                        });
                    }
                } catch (e) {
                    console.error("Erro ao calcular a localização da página:", e);
                }
            }
        },
        [bookId, rendition] // bookId está na dependência
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
                            if (initialLoc !== null) {
                                setPageData({
                                    currentPage: initialLoc + 1,
                                    totalPages: totalLoc,
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
        () => (
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
                                Página {pageData.currentPage} de {pageData.totalPages}
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
        ),
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
                        {/* @ts-ignore */}
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
                        <AdBanner
                            dataAdFormat=""
                            dataFullWidthResponsive={false}
                            dataAdSlot="2423907456"
                            customClassName="mb-4"
                        />
                        <AdBanner dataAdSlot="2423907456" fixed />
                        <AdBannerMobile dataAdSlot="6603126932" fixed />
                        <p className="p-6">
                            “<em>Memórias Póstumas de Brás Cubas</em>”, de <strong>Machado de Assis</strong>.
                            Fonte: <a href="https://www.projeto-adamastor.org/obra/exemplo" rel="noopener" className="text-[#7B66FF] underline decoration-[#7B66FF]/40 underline-offset-2 hover:decoration-[#7B66FF]">Projeto Adamastor</a>.
                            Licença: <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.pt_BR" rel="license noopener" className="text-[#7B66FF] underline decoration-[#7B66FF]/40 underline-offset-2 hover:decoration-[#7B66FF]">CC BY-SA 4.0</a>.
                            <span className="opacity-80 ml-2">Sem alterações. Mantidos os avisos editoriais originais.</span>
                            <span>Alterações: nova capa criada pela equipe Livros Gratuitos; ajustes de formatação; revisões menores no texto.</span>
                            <p className="mt-4">Solicitações de remoção: se você é autor(a), herdeiro(a), representante legal ou proprietário(a) do arquivo/EPUB e deseja a retirada desta obra, escreva para felipematheusdev@gmail.com</p>

                        </p>

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