'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import AdBanner from '@/components/ADS/AdBanner';
import AdBannerMobile from '@/components/ADS/AdsBannerMobile';
import AdResponsive from '@/components/ADS/AdResponsive';
import useIsMobile from '@/hooks/isMobile';
import { useFetchBookBySlug } from '@/hooks/useFetchBookBySlug';
import Metadata from '@/components/Metadata';

const FALLBACK_PDF =
    'https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/pdf%2Fo-pequeno-principe.pdf?alt=media&token=cb7b8f63-e9ac-4154-bc40-2fad4bbec002';

const PDFJS_VERSION = '3.11.174';
const WORKER_SRC = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;
const PDFJS_SRC = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;

declare global {
    interface Window { pdfjsLib: any; }
}

export default function PDFSlugPage({ params }: { params: { slug: string } }) {
    const searchParams = useSearchParams();
    const bookId = searchParams.get('id') ?? '';
    const { slug } = params;

    const { book, isLoading: bookLoading } = useFetchBookBySlug(slug);
    const pdfUrl = book?.pdf || FALLBACK_PDF;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pdfRef = useRef<any>(null);
    const renderTaskRef = useRef<any>(null);
    const touchX = useRef(0);

    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [scale, setScale] = useState(1);
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);
    const [error, setError] = useState('');
    const [pdfReady, setPdfReady] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [thumbnails, setThumbnails] = useState<string[]>([]);

    const [inputPage, setInputPage] = useState('1');

    useEffect(() => {
        setInputPage(String(currentPage));
    }, [currentPage]);

    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile) setScale(0.6);
    }, [isMobile]);

    useEffect(() => {
        if (window.pdfjsLib) { setPdfReady(true); return; }
        const script = document.createElement('script');
        script.src = PDFJS_SRC;
        script.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_SRC;
            setPdfReady(true);
        };
        script.onerror = () => setError('Falha ao carregar PDF.js.');
        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        if (!pdfReady || bookLoading) return;

        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                setThumbnails([]);
                setCurrentPage(1);
                pdfRef.current = null;

                const pdf = await window.pdfjsLib.getDocument(pdfUrl).promise;
                if (cancelled) return;

                pdfRef.current = pdf;
                setNumPages(pdf.numPages);
                setLoading(false);
                generateThumbnails(pdf);
            } catch {
                if (!cancelled) {
                    setError('Não foi possível carregar o livro.');
                    setLoading(false);
                }
            }
        })();

        return () => { cancelled = true; };
    }, [pdfReady, pdfUrl, bookLoading]);

    const generateThumbnails = async (pdf: any) => {
        const total = pdf.numPages;
        const thumbs = new Array(total).fill('');
        setThumbnails(new Array(total).fill(''));

        const promises = Array.from({ length: total }, async (_, i) => {
            try {
                const page = await pdf.getPage(i + 1);
                const viewport = page.getViewport({ scale: 0.3 });
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise;
                thumbs[i] = canvas.toDataURL();
                setThumbnails([...thumbs]);
            } catch { }
        });

        await Promise.all(promises);
    };

    const renderPage = useCallback(async (pageNum: number, sc: number) => {
        if (!pdfRef.current || !canvasRef.current) return;
        renderTaskRef.current?.cancel();
        setPageLoading(true);
        try {
            const page = await pdfRef.current.getPage(pageNum);

            const dpr = window.devicePixelRatio || 1; // 👈 pega o pixel ratio

            const viewport = page.getViewport({ scale: sc * dpr }); // 👈 escala multiplicada

            const canvas = canvasRef.current;

            // Dimensões físicas (pixels reais da tela)
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Dimensões CSS (o que ocupa no layout)
            canvas.style.width = `${viewport.width / dpr}px`;   // 👈
            canvas.style.height = `${viewport.height / dpr}px`; // 👈

            const task = page.render({ canvasContext: canvas.getContext('2d')!, viewport });
            renderTaskRef.current = task;
            await task.promise;
        } catch (e: any) {
            if (e?.name === 'RenderingCancelledException') return;
        } finally {
            setPageLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!loading && pdfRef.current) renderPage(currentPage, scale);
    }, [currentPage, scale, loading, renderPage]);

    const goTo = (p: number) => {
        setCurrentPage(Math.max(1, Math.min(p, numPages)));
        document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDownload = async () => {
        const res = await fetch(pdfUrl);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = book ? `${book.titulo}.pdf` : 'livro.pdf';
        a.click();
        URL.revokeObjectURL(url);
    };


    const isInitializing = bookLoading || loading;

    return (
        <div
            className="flex flex-col bg-slate-100 font-lexend"
            style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}
        >
            <Metadata
                seoTitle={
                    book
                        ? `${book.titulo} - ${book.autor} PDF Grátis`
                        : "Livros Gratuitos PDF Grátis"
                }
                seoDescription={
                    book
                        ? `${book.descricao} PDF Grátis`
                        : "Livros Gratuitos PDF Grátis"
                }
            />            <header className="bg-white h-16 px-4 flex justify-between items-center border-b border-slate-200 shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <a href="/">
                        <img
                            src="/logo.png"
                            style={{ width: "auto", height: "50px" }}
                            alt=""
                        />
                    </a>

                    {bookLoading ? (
                        <div className="h-4 w-40 bg-slate-200 rounded animate-pulse hidden md:block" />
                    ) : (
                        <>
                            <h1 className="font-normal text-gray-800 text-lg hidden md:block">
                                {book?.titulo ?? 'O Pequeno Príncipe'}
                            </h1>
                            <span className="text-gray-400 text-sm hidden md:block">·</span>
                            <span className="text-gray-400 text-sm hidden md:block">
                                {book?.autor ?? 'Antoine de Saint-Exupéry'}
                            </span>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 border-r border-slate-200 pr-3 mr-1">
                        <button
                            onClick={() => setScale(s => Math.max(s - 0.2, 0.4))}
                            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" />
                            </svg>
                        </button>
                        <span className="text-sm text-slate-500 w-10 text-center">{Math.round(scale * 100)}%</span>
                        <button
                            onClick={() => setScale(s => Math.min(s + 0.2, 3))}
                            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                            </svg>
                        </button>
                    </div>

                    {/* Download */}
                    <button
                        onClick={handleDownload}
                        disabled={isInitializing}
                        className="flex items-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded-full text-sm font-medium transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <span className="hidden md:block">Download</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* BODY */}
            <div className="flex flex-1 overflow-hidden">
                <aside
                    className={`${sidebarOpen ? 'w-48' : 'w-0'} transition-all duration-300 overflow-hidden bg-[#ECEAFF] shrink-0 hidden md:flex flex-col`}
                    style={{ scrollbarWidth: 'thin' }}
                >
                    <div className="flex-1 overflow-y-auto flex flex-col items-center py-3 gap-2">
                        {thumbnails.map((src, i) => (
                            <div key={i} className="flex flex-col items-center shrink-0">
                                <div
                                    onClick={() => goTo(i + 1)}
                                    className={`border-2 rounded cursor-pointer transition ${currentPage === i + 1 ? 'border-indigo-500' : 'border-transparent hover:border-indigo-300'
                                        }`}
                                >
                                    {src ? (
                                        <img src={src} alt={`Página ${i + 1}`} className="w-28 block" />
                                    ) : (
                                        <div className="w-28 bg-slate-200 animate-pulse" style={{ height: 160 }} />
                                    )}
                                </div>
                                <span className="text-xs text-slate-500 mt-0.5">{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </aside>

                <button
                    onClick={() => setSidebarOpen(o => !o)}
                    className="hidden md:flex items-center justify-center w-5 bg-[#dddaf5] hover:bg-[#ccc9ef] transition cursor-pointer shrink-0"
                >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5">
                        {sidebarOpen
                            ? <polyline points="15 18 9 12 15 6" />
                            : <polyline points="9 18 15 12 9 6" />
                        }
                    </svg>
                </button>

                <main className="flex-1 overflow-auto bg-slate-100">
                    <div id="top" />
                    <AdBanner
                        dataAdFormat=""
                        dataFullWidthResponsive={false}
                        dataAdSlot="3946512730"
                        customClassName="mt-4"
                    />
                    <AdBannerMobile dataAdSlot="6603126932" customClassName="mt-4" />
                    <div className=' flex justify-center items-center gap-3'>
                        <AdBanner
                            dataAdSlot="9774541568"
                            vertical={true}
                            customClassName="mt-2"
                        />
                        {error ? (
                            <div className="flex items-center justify-center h-full text-red-500 italic">{error}</div>
                        ) : isInitializing ? (
                            <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
                                <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
                                <span className="text-sm">
                                    {bookLoading ? 'Buscando livro…' : 'Carregando PDF…'}
                                </span>
                            </div>
                        ) : (
                            <div
                                className="flex justify-center p-6 pb-6"
                                onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
                                onTouchEnd={(e) => {
                                    const dx = e.changedTouches[0].clientX - touchX.current;
                                    if (Math.abs(dx) > 50) goTo(currentPage + (dx < 0 ? 1 : -1));
                                }}
                            >
                                <div className="relative inline-block shadow-2xl">
                                    <canvas ref={canvasRef} className="block" />
                                    {pageLoading && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                                            <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <AdBanner
                            dataAdSlot="3432494495"
                            vertical={true}
                            customClassName="mt-2"
                        />
                    </div>


                    <AdBanner
                        dataAdFormat=""
                        dataFullWidthResponsive={false}
                        dataAdSlot="2423907456"
                        customClassName="mb-4"
                    />
                    <AdResponsive dataAdSlot="1435361044" />
                </main>
            </div>

            {!isInitializing && !error && (
                <div
                    className="fixed bottom-6 z-50 pointer-events-none flex justify-center"
                    style={{
                        left: sidebarOpen && !isMobile ? '12rem' : '0', // 12rem = w-48 da sidebar + toggle (w-5)
                        right: 0,
                        transition: 'left 0.3s',
                    }}
                >
                    <div className="pointer-events-auto flex items-center gap-2 bg-slate-900 text-white rounded-full px-4 py-2 shadow-xl">
                        <button
                            onClick={() => goTo(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="p-1 rounded-full hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-1.5 text-sm px-1">
                            <input
                                type="number"
                                value={inputPage}
                                min={1}
                                max={numPages}
                                onChange={(e) => setInputPage(e.target.value)}
                                onBlur={() => {
                                    const v = parseInt(inputPage);
                                    if (!isNaN(v)) goTo(v);
                                    else setInputPage(String(currentPage));
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const v = parseInt(inputPage);
                                        if (!isNaN(v)) goTo(v);
                                        else setInputPage(String(currentPage));
                                        (e.target as HTMLInputElement).blur();
                                    }
                                }}
                                className="w-9 text-center bg-slate-700 rounded-md py-0.5 text-white text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-slate-400">de</span>
                            <span>{numPages}</span>
                        </div>

                        <button
                            onClick={() => goTo(currentPage + 1)}
                            disabled={currentPage >= numPages}
                            className="p-1 rounded-full hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}