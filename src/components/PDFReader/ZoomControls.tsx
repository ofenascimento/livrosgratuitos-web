interface ZoomControlsProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function ZoomControls({ scale, onZoomIn, onZoomOut }: ZoomControlsProps) {
  return (
    <div className="flex items-center gap-1 border-r border-slate-200 pr-3 mr-1">
      <button
        onClick={onZoomOut}
        className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </button>
      <span className="text-sm text-slate-500 w-10 text-center">{Math.round(scale * 100)}%</span>
      <button
        onClick={onZoomIn}
        className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </button>
    </div>
  );
}