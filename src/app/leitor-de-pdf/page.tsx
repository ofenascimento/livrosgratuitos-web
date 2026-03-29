'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import useIsMobile from '@/hooks/isMobile';

const PDFJS_VERSION = '3.11.174';
const WORKER_SRC = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;
const PDFJS_SRC = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;

declare global {
    interface Window { pdfjsLib: any; }
}

type Tool = 'none' | 'draw' | 'text';

interface Annotation {
    type: 'draw' | 'text';
    page: number;
}
interface DrawAnnotation extends Annotation {
    type: 'draw';
    points: { x: number; y: number }[];
    color: string;
    size: number;
}
interface TextAnnotation extends Annotation {
    type: 'text';
    x: number;
    y: number;
    text: string;
    color: string;
    fontSize: number;
}

type AnyAnnotation = DrawAnnotation | TextAnnotation;

const COLORS = ['#1e1e1e', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#7B66FF', '#ec4899'];
const BRUSH_SIZES = [2, 4, 8, 14];

const features = [
    {
        icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>),
        title: 'Privado por padrão',
        desc: 'Seu arquivo nunca sai do navegador. Nenhum dado é enviado a servidores.',
    },
    {
        icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
        title: 'Carregamento rápido',
        desc: 'Renderização página a página com PDF.js nativo. Sem espera, sem travamento.',
    },
    {
        icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>),
        title: 'Leitura confortável',
        desc: 'Miniaturas na barra lateral, zoom preciso e navegação fluida por toque ou teclado.',
    },
    {
        icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="15" y2="11" /><line x1="9" y1="15" x2="13" y2="15" /></svg>),
        title: 'Qualquer PDF',
        desc: 'Livros, apostilas, contratos, apresentações. Funciona com qualquer arquivo PDF.',
    },
    {
        icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>),
        title: 'Funciona offline',
        desc: 'Após carregado, leia sem internet. Ideal para viagens ou ambientes sem conexão.',
    },
    {
        icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2" /><polyline points="8 2 8 8 12 6 16 8 16 2" /></svg>),
        title: 'Sem cadastro',
        desc: 'Não precisa criar conta, instalar nada ou aceitar cookies. Só abrir e ler.',
    },
];

const steps = [
    { num: '01', title: 'Faça upload', desc: 'Arraste seu PDF ou clique para selecionar do dispositivo.' },
    { num: '02', title: 'Leia com conforto', desc: 'O leitor abre instantaneamente com todas as ferramentas disponíveis.' },
    { num: '03', title: 'Navegue livremente', desc: 'Use as miniaturas, zoom ou swipe para se mover pelo documento.' },
];

export default function UploadReaderPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawCanvasRef = useRef<HTMLCanvasElement>(null);
    const pdfRef = useRef<any>(null);
    const renderTaskRef = useRef<any>(null);
    const touchX = useRef(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const landingInputRef = useRef<HTMLInputElement>(null);
    const isDrawing = useRef(false);
    const currentStroke = useRef<{ x: number; y: number }[]>([]);
    const textInputRef = useRef<HTMLInputElement>(null);

    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [scale, setScale] = useState(1);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [error, setError] = useState('');
    const [pdfReady, setPdfReady] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [thumbnails, setThumbnails] = useState<string[]>([]);
    const [inputPage, setInputPage] = useState('1');
    const [fileName, setFileName] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [hasFile, setHasFile] = useState(false);

    // ── Annotations ──
    const [activeTool, setActiveTool] = useState<Tool>('none');
    const [annotations, setAnnotations] = useState<AnyAnnotation[]>([]);
    const [penColor, setPenColor] = useState('#1e1e1e');
    const [penSize, setPenSize] = useState(4);
    const [textColor, setTextColor] = useState('#1e1e1e');
    const [fontSize, setFontSize] = useState(16);
    const [pendingText, setPendingText] = useState<{ x: number; y: number } | null>(null);
    const [textValue, setTextValue] = useState('');
    const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });

    const isMobile = useIsMobile();

    // Adicione essa ref no topo junto com as outras
    const annotationsRef = useRef<AnyAnnotation[]>([]);

    // Mantenha a ref sincronizada com o state
    useEffect(() => {
        annotationsRef.current = annotations;
    }, [annotations]);

    useEffect(() => { setInputPage(String(currentPage)); }, [currentPage]);
    useEffect(() => { if (isMobile) { setScale(0.6); setSidebarOpen(false); } }, [isMobile]);

    useEffect(() => {
        if (window.pdfjsLib) { setPdfReady(true); return; }
        const script = document.createElement('script');
        script.src = PDFJS_SRC;
        script.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_SRC; setPdfReady(true); };
        script.onerror = () => setError('Falha ao carregar PDF.js.');
        document.head.appendChild(script);
    }, []);

    const loadPDF = useCallback(async (file: File) => {
        if (!pdfReady) return;
        if (file.type !== 'application/pdf') { setError('Por favor, selecione um arquivo PDF válido.'); return; }
        setLoading(true); setError(''); setThumbnails([]); setCurrentPage(1); setHasFile(false);
        pdfRef.current = null;
        setAnnotations([]);
        const url = URL.createObjectURL(file);
        setFileName(file.name.replace(/\.pdf$/i, ''));
        try {
            const pdf = await window.pdfjsLib.getDocument(url).promise;
            pdfRef.current = pdf;
            setNumPages(pdf.numPages);
            setLoading(false); setHasFile(true);
            generateThumbnails(pdf);
        } catch {
            setError('Não foi possível carregar o PDF.'); setLoading(false);
        }
    }, [pdfReady]);

    const generateThumbnails = async (pdf: any) => {
        const total = pdf.numPages;
        const thumbs = new Array(total).fill('');
        setThumbnails(new Array(total).fill(''));
        const promises = Array.from({ length: total }, async (_, i) => {
            try {
                const page = await pdf.getPage(i + 1);
                const viewport = page.getViewport({ scale: 0.3 });
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width; canvas.height = viewport.height;
                await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise;
                thumbs[i] = canvas.toDataURL();
                setThumbnails([...thumbs]);
            } catch { }
        });
        await Promise.all(promises);
    };

    // Substitua o renderPage completo
    const renderPage = useCallback(async (pageNum: number, sc: number) => {
        if (!pdfRef.current || !canvasRef.current) return;
        renderTaskRef.current?.cancel();
        setPageLoading(true);
        try {
            const page = await pdfRef.current.getPage(pageNum);
            const dpr = window.devicePixelRatio || 1;
            const viewport = page.getViewport({ scale: sc * dpr });
            const canvas = canvasRef.current;
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.style.width = `${viewport.width / dpr}px`;
            canvas.style.height = `${viewport.height / dpr}px`;

            const cssW = viewport.width / dpr;
            const cssH = viewport.height / dpr;

            const dc = drawCanvasRef.current;
            if (dc) {
                dc.width = cssW;
                dc.height = cssH;
                dc.style.width = `${cssW}px`;
                dc.style.height = `${cssH}px`;
            }

            setCanvasSize({ w: cssW, h: cssH });

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

    // Substitua o useEffect de redraw — só roda quando NÃO está desenhando
    const redrawAnnotations = useCallback(() => {
        const dc = drawCanvasRef.current;
        if (!dc || dc.width === 0) return;
        const ctx = dc.getContext('2d')!;
        ctx.clearRect(0, 0, dc.width, dc.height);
        const pageAnnotations = annotationsRef.current.filter(a => a.page === currentPage);
        for (const ann of pageAnnotations) {
            if (ann.type === 'draw') {
                const d = ann as DrawAnnotation;
                if (d.points.length < 2) continue;
                ctx.beginPath();
                ctx.strokeStyle = d.color;
                ctx.lineWidth = d.size;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.moveTo(d.points[0].x, d.points[0].y);
                for (let i = 1; i < d.points.length; i++) ctx.lineTo(d.points[i].x, d.points[i].y);
                ctx.stroke();
            } else if (ann.type === 'text') {
                const t = ann as TextAnnotation;
                ctx.font = `${t.fontSize}px 'DM Sans', sans-serif`;
                ctx.fillStyle = t.color;
                ctx.fillText(t.text, t.x, t.y);
            }
        }
    }, [currentPage]);

    useEffect(() => {
        if (!isDrawing.current) redrawAnnotations();
    }, [annotations, currentPage, canvasSize, redrawAnnotations]);

    // Substitua getPos — garante coordenadas corretas independente de scroll/zoom
    const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const dc = drawCanvasRef.current!;
        const rect = dc.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (activeTool === 'draw') {
            isDrawing.current = true;
            currentStroke.current = [getPos(e)];
        } else if (activeTool === 'text') {
            const pos = getPos(e);
            setPendingText(pos);
            setTextValue('');
            setTimeout(() => textInputRef.current?.focus(), 50);
        }
    };

    // Substitua onMouseMove — preview simples sem tocar no clearRect
    const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (activeTool !== 'draw' || !isDrawing.current) return;
        const pos = getPos(e);
        currentStroke.current.push(pos);
        const dc = drawCanvasRef.current!;
        const ctx = dc.getContext('2d')!;
        ctx.beginPath();
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        const pts = currentStroke.current;
        if (pts.length >= 2) {
            ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
            ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
            ctx.stroke();
        }
    };

    // Substitua onMouseUp — redesenha tudo depois de commitar o stroke
    const onMouseUp = () => {
        if (activeTool !== 'draw' || !isDrawing.current) return;
        isDrawing.current = false;
        if (currentStroke.current.length < 2) { currentStroke.current = []; return; }

        const newAnnotation: DrawAnnotation = {
            type: 'draw', page: currentPage,
            points: [...currentStroke.current],
            color: penColor, size: penSize,
        };
        currentStroke.current = [];

        setAnnotations(prev => {
            const next = [...prev, newAnnotation];
            annotationsRef.current = next;
            // redesenha sincronamente usando a ref atualizada
            setTimeout(() => redrawAnnotations(), 0);
            return next;
        });
    };

    const commitText = () => {
        if (!pendingText || !textValue.trim()) { setPendingText(null); return; }
        setAnnotations(prev => [...prev, {
            type: 'text', page: currentPage,
            x: pendingText.x, y: pendingText.y,
            text: textValue, color: textColor, fontSize,
        }]);
        setPendingText(null);
        setTextValue('');
    };

    const undoLast = () => {
        setAnnotations(prev => {
            const pageAnns = prev.filter(a => a.page === currentPage);
            if (!pageAnns.length) return prev;
            const last = pageAnns[pageAnns.length - 1];
            const idx = prev.lastIndexOf(last);
            return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
        });
    };

    const clearPage = () => setAnnotations(prev => prev.filter(a => a.page !== currentPage));

    const toggleTool = (t: Tool) => setActiveTool(prev => prev === t ? 'none' : t);

    const goTo = (p: number) => {
        setCurrentPage(Math.max(1, Math.min(p, numPages)));
        setPendingText(null);
        document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false); };
    const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if (file) loadPDF(file); };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) loadPDF(file); };

    // ── LANDING ──────────────────────────────────────────────────────────────
    if (!hasFile && !loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col font-dmSans" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                <nav className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-slate-100">
                    <a href="/"><img src="/logo.png" style={{ height: 26, width: 'auto' }} alt="logo" /></a>
                    <button onClick={() => landingInputRef.current?.click()} className="bg-main-500 hover:bg-main-600 text-white text-sm font-medium rounded-full px-5 py-2 transition cursor-pointer font-dmSans">Abrir PDF</button>
                </nav>

                <section className="flex flex-col items-center text-center px-6 pt-6 pb-16">
                    <span className="inline-flex items-center gap-1.5 bg-main-50 text-main-500 text-xs font-medium rounded-full px-3 py-1 mb-6 border border-main-100 tracking-wide font-dmSans">Ler PDF ONLINE</span>
                    <h1 className="font-redRat text-5xl md:text-7xl font-bold text-black leading-[1.08] tracking-tight max-w-3xl">
                        Leia PDFs com<br /><span className="text-main-500">total liberdade</span>
                    </h1>
                    <p className="font-dmSans mt-5 text-black text-base md:text-lg max-w-lg leading-relaxed">Faça upload do seu arquivo e leia direto no navegador. Rápido, privado e sem complicação.</p>

                    <div onClick={() => landingInputRef.current?.click()} className={`mt-10 w-full max-w-xl rounded-3xl border-2 border-dashed cursor-pointer transition-all duration-200 ${isDragging ? 'border-main-500 bg-main-50 scale-[1.015]' : 'border-slate-200 bg-slate-50 hover:border-main-300 hover:bg-main-50/50'}`}>
                        <div className="flex flex-col items-center gap-4 py-14 px-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${isDragging ? 'bg-main-100 text-main-500 scale-110' : 'bg-white text-main-400 shadow-sm border border-slate-100'}`}>
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
                            </div>
                            <div>
                                <p className="font-dmSans font-medium text-black">{isDragging ? 'Solte o arquivo aqui' : 'Arraste seu PDF aqui'}</p>
                                <p className="font-dmSans text-black text-sm mt-1">ou clique para selecionar do dispositivo</p>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); landingInputRef.current?.click(); }} className="font-dmSans bg-main-500 hover:bg-main-600 text-white rounded-full px-6 py-2.5 text-sm font-medium transition cursor-pointer shadow-md shadow-main-100">Selecionar arquivo</button>
                            {error && <p className="font-dmSans text-red-500 text-sm">{error}</p>}
                        </div>
                    </div>
                    <input ref={landingInputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                    <p className="font-dmSans mt-4 text-black text-xs flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        Seu arquivo permanece no seu dispositivo
                    </p>
                </section>

                <section className="px-6 md:px-12 py-16 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-3xl mx-auto">
                        <p className="font-dmSans text-xs font-semibold text-main-500 tracking-widest uppercase mb-3 text-center">Como funciona</p>
                        <h2 className="font-redRat text-3xl md:text-4xl font-bold text-black text-center mb-12">Três passos. Simples assim.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {steps.map((s) => (
                                <div key={s.num} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                    <span className="font-redRat text-4xl font-bold text-main-100 leading-none block mb-3">{s.num}</span>
                                    <p className="font-redRat font-semibold text-black text-base mb-1">{s.title}</p>
                                    <p className="font-dmSans text-black text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-12 py-16">
                    <div className="max-w-4xl mx-auto">
                        <p className="font-dmSans text-xs font-semibold text-main-500 tracking-widest uppercase mb-3 text-center">Recursos</p>
                        <h2 className="font-redRat text-3xl md:text-4xl font-bold text-black text-center mb-12">Tudo que você precisa para ler</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {features.map((f) => (
                                <div key={f.title} className="rounded-2xl border border-slate-100 p-6 hover:border-main-100 hover:shadow-sm transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-main-50 text-main-400 flex items-center justify-center mb-4">{f.icon}</div>
                                    <p className="font-redRat font-semibold text-black mb-1">{f.title}</p>
                                    <p className="font-dmSans text-black text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="px-6 py-6 border-t border-slate-100 flex items-center justify-between">
                    <a href="/"><img src="/logo.png" style={{ height: 22, width: 'auto' }} alt="logo" /></a>
                    <p className="font-dmSans text-black text-xs">© {new Date().getFullYear()} · Leitor PDF Online</p>
                </footer>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="fixed inset-0 bg-slate-100 flex flex-col items-center justify-center gap-4 text-black font-dmSans">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-main-500 rounded-full animate-spin" />
                <span className="text-sm">Carregando PDF…</span>
            </div>
        );
    }

    // ── READER ────────────────────────────────────────────────────────────────
    return (
        <div className="flex flex-col bg-slate-100 font-dmSans" style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>

            {/* HEADER */}
            <header className="bg-white h-16 px-4 flex justify-between items-center border-b border-slate-200 shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <a href="/"><img src="/logo.png" style={{ width: 'auto', height: '28px' }} alt="" /></a>
                    <h1 className="font-redRat font-semibold text-black text-base hidden md:block truncate max-w-xs">{fileName}</h1>
                    <span className="text-gray-300 hidden md:block">·</span>
                    <span className="font-dmSans text-black text-sm hidden md:block">{numPages} páginas</span>
                </div>

                <div className="flex items-center gap-2">
                    {/* Zoom */}
                    <div className="flex items-center gap-1 border-r border-slate-200 pr-3 mr-1">
                        <button onClick={() => setScale(s => Math.max(s - 0.2, 0.4))} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition cursor-pointer">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                        </button>
                        <span className="font-dmSans text-sm text-black w-10 text-center">{Math.round(scale * 100)}%</span>
                        <button onClick={() => setScale(s => Math.min(s + 0.2, 3))} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition cursor-pointer">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                        </button>
                    </div>

                    <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                    <button onClick={() => fileInputRef.current?.click()} className="font-dmSans flex items-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded-full text-sm font-medium transition cursor-pointer">
                        <span className="hidden md:block">Trocar PDF</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">

                {/* SIDEBAR */}
                <aside className={`${sidebarOpen ? 'w-48' : 'w-0'} transition-all duration-300 overflow-hidden bg-[#ECEAFF] shrink-0 hidden md:flex flex-col`} style={{ scrollbarWidth: 'thin' }}>
                    <div className="flex-1 overflow-y-auto flex flex-col items-center py-3 gap-2">
                        {thumbnails.map((src, i) => (
                            <div key={i} className="flex flex-col items-center shrink-0">
                                <div onClick={() => goTo(i + 1)} className={`border-2 rounded cursor-pointer transition ${currentPage === i + 1 ? 'border-main-500' : 'border-transparent hover:border-main-300'}`}>
                                    {src ? <img src={src} alt={`Página ${i + 1}`} className="w-28 block" /> : <div className="w-28 bg-slate-200 animate-pulse" style={{ height: 160 }} />}
                                </div>
                                <span className="font-dmSans text-xs text-slate-500 mt-0.5">{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </aside>

                <button onClick={() => setSidebarOpen(o => !o)} className="hidden md:flex items-center justify-center w-5 bg-[#dddaf5] hover:bg-[#ccc9ef] transition cursor-pointer shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5">
                        {sidebarOpen ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
                    </svg>
                </button>

                {/* MAIN */}
                <main className="flex-1 overflow-auto bg-slate-100 flex flex-col">
                    <div id="top" />

                    {/* ── ANNOTATION TOOLBAR ── */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-slate-100 flex-wrap">

                        {/* Ferramentas */}
                        <div className="flex items-center gap-1 border-r border-slate-200 pr-3 mr-1">
                            {/* Desenhar */}
                            <button
                                onClick={() => toggleTool('draw')}
                                title="Desenhar"
                                className={`p-2 rounded-lg transition cursor-pointer ${activeTool === 'draw' ? 'bg-main-500 text-white' : 'hover:bg-slate-100 text-slate-600'}`}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                </svg>
                            </button>
                            {/* Texto */}
                            <button
                                onClick={() => toggleTool('text')}
                                title="Adicionar texto"
                                className={`p-2 rounded-lg transition cursor-pointer ${activeTool === 'text' ? 'bg-main-500 text-white' : 'hover:bg-slate-100 text-slate-600'}`}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />
                                </svg>
                            </button>
                        </div>

                        {/* Opções de desenho */}
                        {activeTool === 'draw' && (
                            <div className="flex items-center gap-2 border-r border-slate-200 pr-3 mr-1">
                                {/* Cores */}
                                <div className="flex gap-1">
                                    {COLORS.map(c => (
                                        <button key={c} onClick={() => setPenColor(c)} className="rounded-full border-2 transition cursor-pointer" style={{ width: 18, height: 18, background: c, borderColor: penColor === c ? '#0f172a' : 'transparent' }} />
                                    ))}
                                </div>
                                {/* Tamanho */}
                                <div className="flex gap-1 items-center ml-1">
                                    {BRUSH_SIZES.map(s => (
                                        <button key={s} onClick={() => setPenSize(s)} className={`rounded-full transition cursor-pointer flex items-center justify-center ${penSize === s ? 'bg-main-500' : 'bg-slate-200 hover:bg-slate-300'}`} style={{ width: s + 10, height: s + 10 }}>
                                            <span className="sr-only">{s}px</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Opções de texto */}
                        {activeTool === 'text' && (
                            <div className="flex items-center gap-2 border-r border-slate-200 pr-3 mr-1">
                                {/* Cores */}
                                <div className="flex gap-1">
                                    {COLORS.map(c => (
                                        <button key={c} onClick={() => setTextColor(c)} className="rounded-full border-2 transition cursor-pointer" style={{ width: 18, height: 18, background: c, borderColor: textColor === c ? '#0f172a' : 'transparent' }} />
                                    ))}
                                </div>
                                {/* Font size */}
                                <select value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="font-dmSans text-xs border border-slate-200 rounded-lg px-2 py-1 text-black bg-white cursor-pointer outline-none">
                                    {[10, 12, 14, 16, 20, 24, 32].map(s => <option key={s} value={s}>{s}px</option>)}
                                </select>
                            </div>
                        )}

                        {/* Hint */}
                        {activeTool !== 'none' && (
                            <span className="font-dmSans text-xs text-slate-400 hidden md:block">
                                {activeTool === 'draw' ? 'Clique e arraste para desenhar' : 'Clique na página para inserir texto'}
                            </span>
                        )}

                        {/* Undo / Clear — só se houver anotações na página */}
                        {annotations.some(a => a.page === currentPage) && (
                            <div className="flex items-center gap-1 ml-auto">
                                <button onClick={undoLast} title="Desfazer" className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition cursor-pointer">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 14 4 9 9 4" /><path d="M20 20v-7a4 4 0 0 0-4-4H4" /></svg>
                                </button>
                                <button onClick={clearPage} title="Limpar página" className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition cursor-pointer">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* CANVAS AREA */}
                    <div
                        className="flex justify-center p-6 pb-24 flex-1"
                        onTouchStart={(e) => { if (activeTool === 'none') touchX.current = e.touches[0].clientX; }}
                        onTouchEnd={(e) => { if (activeTool === 'none') { const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 50) goTo(currentPage + (dx < 0 ? 1 : -1)); } }}
                    >
                        <div className="relative inline-block shadow-2xl">
                            {/* PDF canvas */}
                            <canvas ref={canvasRef} className="block" />

                            {/* Draw canvas sobreposto */}
                            <canvas
                                ref={drawCanvasRef}
                                className="absolute inset-0"
                                style={{
                                    cursor: activeTool === 'draw' ? 'crosshair' : activeTool === 'text' ? 'text' : 'default',
                                    pointerEvents: activeTool === 'none' ? 'none' : 'all',
                                }}
                                onMouseDown={onMouseDown}
                                onMouseMove={onMouseMove}
                                onMouseUp={onMouseUp}
                                onMouseLeave={onMouseUp}
                            />

                            {/* Input de texto flutuante */}
                            {pendingText && (
                                <input
                                    ref={textInputRef}
                                    value={textValue}
                                    onChange={e => setTextValue(e.target.value)}
                                    onBlur={commitText}
                                    onKeyDown={e => { if (e.key === 'Enter') commitText(); if (e.key === 'Escape') { setPendingText(null); setTextValue(''); } }}
                                    className="absolute bg-transparent outline-none border-b border-dashed border-main-400 font-dmSans"
                                    style={{
                                        left: pendingText.x,
                                        top: pendingText.y - fontSize,
                                        fontSize: fontSize,
                                        color: textColor,
                                        minWidth: 80,
                                        lineHeight: 1,
                                    }}
                                    placeholder="Digite aqui…"
                                />
                            )}

                            {pageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                                    <div className="w-8 h-8 border-4 border-slate-200 border-t-main-500 rounded-full animate-spin" />
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* NAV BAR */}
            <div className="fixed bottom-6 z-50 pointer-events-none flex justify-center" style={{ left: sidebarOpen && !isMobile ? '12rem' : '0', right: 0, transition: 'left 0.3s' }}>
                <div className="pointer-events-auto flex items-center gap-2 bg-slate-900 text-white rounded-full px-4 py-2 shadow-xl">
                    <button onClick={() => goTo(currentPage - 1)} disabled={currentPage <= 1} className="p-1 rounded-full hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    <div className="font-dmSans flex items-center gap-1.5 text-sm px-1">
                        <input type="number" value={inputPage} min={1} max={numPages}
                            onChange={(e) => setInputPage(e.target.value)}
                            onBlur={() => { const v = parseInt(inputPage); if (!isNaN(v)) goTo(v); else setInputPage(String(currentPage)); }}
                            onKeyDown={(e) => { if (e.key === 'Enter') { const v = parseInt(inputPage); if (!isNaN(v)) goTo(v); else setInputPage(String(currentPage)); (e.target as HTMLInputElement).blur(); } }}
                            className="w-9 text-center bg-slate-700 rounded-md py-0.5 text-white text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-white">de</span>
                        <span>{numPages}</span>
                    </div>
                    <button onClick={() => goTo(currentPage + 1)} disabled={currentPage >= numPages} className="p-1 rounded-full hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}