import ZoomControls from "./ZoomControls";

interface PDFReaderHeaderProps {
  bookLoading: boolean;
  titulo?: string;
  autor?: string;
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload: () => void;
  downloadDisabled: boolean;
}

export default function PDFReaderHeader({
  bookLoading,
  titulo,
  autor,
  scale,
  onZoomIn,
  onZoomOut,
  onDownload,
  downloadDisabled,
}: PDFReaderHeaderProps) {
  return (
    <header className="bg-white h-16 px-4 flex justify-between items-center border-b border-slate-200 shrink-0 z-10">
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
              {titulo ?? "O Pequeno Príncipe"}
            </h1>
            <span className="text-gray-400 text-sm hidden md:block">·</span>
            <span className="text-gray-400 text-sm hidden md:block">
              {autor ?? "Antoine de Saint-Exupéry"}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <ZoomControls scale={scale} onZoomIn={onZoomIn} onZoomOut={onZoomOut} />

        <button
          onClick={onDownload}
          disabled={downloadDisabled}
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
  );
}