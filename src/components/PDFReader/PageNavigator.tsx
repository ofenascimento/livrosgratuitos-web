import { useEffect, useState } from "react";

interface PageNavigatorProps {
  currentPage: number;
  numPages: number;
  onGoTo: (page: number) => void;
  sidebarOpen: boolean;
  isMobile: boolean;
}

export default function PageNavigator({
  currentPage,
  numPages,
  onGoTo,
  sidebarOpen,
  isMobile,
}: PageNavigatorProps) {
  const [inputPage, setInputPage] = useState(String(currentPage));

  useEffect(() => {
    setInputPage(String(currentPage));
  }, [currentPage]);

  const commitInput = () => {
    const v = parseInt(inputPage);
    if (!isNaN(v)) onGoTo(v);
    else setInputPage(String(currentPage));
  };

  return (
    <div
      className="fixed bottom-6 z-50 pointer-events-none flex justify-center"
      style={{
        left: sidebarOpen && !isMobile ? "12rem" : "0",
        right: 0,
        transition: "left 0.3s",
      }}
    >
      <div className="pointer-events-auto flex items-center gap-2 bg-slate-900 text-white rounded-full px-4 py-2 shadow-xl">
        <button
          onClick={() => onGoTo(currentPage - 1)}
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
            onBlur={commitInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                commitInput();
                (e.target as HTMLInputElement).blur();
              }
            }}
            className="w-9 text-center bg-slate-700 rounded-md py-0.5 text-white text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-slate-400">de</span>
          <span>{numPages}</span>
        </div>

        <button
          onClick={() => onGoTo(currentPage + 1)}
          disabled={currentPage >= numPages}
          className="p-1 rounded-full hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}