'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdBanner from '@/components/ADS/AdBanner';
import AdBannerMobile from '@/components/ADS/AdsBannerMobile';
import AdResponsive from '@/components/ADS/AdResponsive';
import useIsMobile from '@/hooks/isMobile';
import { useBookBySlug } from '@/hooks/useBooks';
import Metadata from '@/components/Metadata';
import { usePdfJsLoader } from '@/hooks/usePdfJsLoader';
import { usePdfDocument } from '@/hooks/usePdfDocument';
import { usePdfPageRenderer } from '@/hooks/usePdfPageRenderer';
import PDFReaderHeader from '@/components/PDFReader/PDFReaderHeader';
import ThumbnailSidebar from '@/components/PDFReader/ThumbnailSidebar';
import PDFCanvas from '@/components/PDFReader/PDFCanvas';
import PageNavigator from '@/components/PDFReader/PageNavigator';

export default function PDFSlugPage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookId = searchParams.get('id') ?? '';
    const { slug } = params;

    const { book, isLoading: bookLoading } = useBookBySlug(slug);
    const pdfUrl = book?.pdf ?? '';

    useEffect(() => {
        if (!bookLoading && book && !book.pdf) {
            router.push('/');
        }
    }, [bookLoading, book, router]);

    const { pdfReady, error: scriptError } = usePdfJsLoader();
    const { pdf, numPages, thumbnails, loading, error: pdfError } = usePdfDocument(
        pdfUrl,
        pdfReady && !bookLoading && !!pdfUrl
    );

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { renderPage, pageLoading } = usePdfPageRenderer(pdf, canvasRef);

    const touchX = useRef(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [scale, setScale] = useState(1);
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (scriptError) setError(scriptError);
        else if (pdfError) setError(pdfError);
    }, [scriptError, pdfError]);

    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile) setScale(0.6);
    }, [isMobile]);

    useEffect(() => {
        if (!loading && pdf) renderPage(currentPage, scale);
    }, [currentPage, scale, loading, pdf, renderPage]);

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
            />

            <PDFReaderHeader
                bookLoading={bookLoading}
                titulo={book?.titulo}
                autor={book?.autor}
                scale={scale}
                onZoomIn={() => setScale(s => Math.min(s + 0.2, 3))}
                onZoomOut={() => setScale(s => Math.max(s - 0.2, 0.4))}
                onDownload={handleDownload}
                downloadDisabled={isInitializing}
            />

            <div className="flex flex-1 overflow-hidden">
                <ThumbnailSidebar
                    thumbnails={thumbnails}
                    currentPage={currentPage}
                    isOpen={sidebarOpen}
                    onSelectPage={goTo}
                />

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
                            <PDFCanvas
                                canvasRef={canvasRef}
                                pageLoading={pageLoading}
                                onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
                                onTouchEnd={(e) => {
                                    const dx = e.changedTouches[0].clientX - touchX.current;
                                    if (Math.abs(dx) > 50) goTo(currentPage + (dx < 0 ? 1 : -1));
                                }}
                            />
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
                <PageNavigator
                    currentPage={currentPage}
                    numPages={numPages}
                    onGoTo={goTo}
                    sidebarOpen={sidebarOpen}
                    isMobile={isMobile}
                />
            )}
        </div>
    );
}