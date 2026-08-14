interface ThumbnailSidebarProps {
  thumbnails: string[];
  currentPage: number;
  isOpen: boolean;
  onSelectPage: (page: number) => void;
}

export default function ThumbnailSidebar({
  thumbnails,
  currentPage,
  isOpen,
  onSelectPage,
}: ThumbnailSidebarProps) {
  return (
    <aside
      className={`${isOpen ? "w-48" : "w-0"} transition-all duration-300 overflow-hidden bg-[#ECEAFF] shrink-0 hidden md:flex flex-col`}
      style={{ scrollbarWidth: "thin" }}
    >
      <div className="flex-1 overflow-y-auto flex flex-col items-center py-3 gap-2">
        {thumbnails.map((src, i) => (
          <div key={i} className="flex flex-col items-center shrink-0">
            <div
              onClick={() => onSelectPage(i + 1)}
              className={`border-2 rounded cursor-pointer transition ${
                currentPage === i + 1 ? "border-indigo-500" : "border-transparent hover:border-indigo-300"
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
  );
}