"use client";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import { HiChevronLeft, HiDotsVertical } from "react-icons/hi";
import { MdInfoOutline, MdMenuBook } from "react-icons/md";

interface PageData {
  currentPage: number;
  totalPages: number;
  percentage: number;
}

interface EpubReaderToolbarProps {
  hasEpub: boolean;
  isLoading: boolean;
  location: string | number | null;
  locationsReady: boolean;
  pageData: PageData | null;
  tocLength: number;
  onBack: () => void;
  onToggleToc: () => void;
  onOpenAuthorInfo: () => void;
  onOpenConfig: () => void;
}

export default function EpubReaderToolbar({
  hasEpub,
  isLoading,
  location,
  locationsReady,
  pageData,
  tocLength,
  onBack,
  onToggleToc,
  onOpenAuthorInfo,
  onOpenConfig,
}: EpubReaderToolbarProps) {
  if (!hasEpub || isLoading || location === null) {
    return <FullScreenLoader label={isLoading ? "Carregando EPUB" : "Aguardando progresso..."} />;
  }

  const progress = locationsReady && pageData ? Math.round(pageData.percentage * 100).toString() : "";
  const percentageDisplay = locationsReady && pageData ? ` | ${progress}%` : "";

  return (
    <div className="sticky top-0 z-10 w-full border-b border-zinc-800/20 bg-black backdrop-blur">
      <div className="mx-auto flex max-w-5xl justify-between items-center gap-2 p-2 pb-22">
        <div className=" flex justify-center items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-800 cursor-pointer rounded-full text-white lg:px-4 p-2 flex gap-2 justify-center items-center"
          >
            <HiChevronLeft />
            <p className="hidden lg:block font-lexend text-sm font-normal">Voltar</p>
          </button>
          {tocLength > 1 && (
            <button
              onClick={onToggleToc}
              className="rounded-full lg:px-4 p-2 text-sm bg-gray-800 flex justify-center items-center gap-3 font-normal text-white font-lexend "
            >
              <MdMenuBook /> <span className="hidden md:block">Sumário</span>
            </button>
          )}
        </div>

        <div className=" flex flex-col jusitfy-center items-center gap-2">
          {locationsReady && pageData && (
            <div className="w-full h-1 bg-gray-800">
              <div
                className="h-1 bg-main-500 transition-all duration-300"
                style={{ width: `${Math.round(pageData.percentage * 100)}%` }}
              />
            </div>
          )}
          {locationsReady && pageData && (
            <div className="text-white text-sm font-lexend opacity-80 font-normal">
              {`Posição ${pageData.currentPage} de ${pageData.totalPages}${percentageDisplay}`}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAuthorInfo}
            className="bg-gray-800 text-white lg:px-4 p-2 rounded-full flex gap-2 justify-center items-center"
          >
            <p className="hidden lg:block font-lexend text-sm font-normal">Informações</p>
            <MdInfoOutline />
          </button>
          <button
            onClick={onOpenConfig}
            className="bg-gray-800 text-white lg:px-4 p-2 rounded-full flex gap-2 justify-center items-center"
          >
            <p className="hidden lg:block font-lexend text-sm font-normal">Configurações</p>
            <HiDotsVertical />
          </button>
        </div>
      </div>
    </div>
  );
}