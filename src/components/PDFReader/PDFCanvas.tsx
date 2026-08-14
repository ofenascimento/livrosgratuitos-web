import { MutableRefObject } from "react";

interface PDFCanvasProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  pageLoading: boolean;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

export default function PDFCanvas({ canvasRef, pageLoading, onTouchStart, onTouchEnd }: PDFCanvasProps) {
  return (
    <div
      className="flex justify-center p-6 pb-6"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
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
  );
}