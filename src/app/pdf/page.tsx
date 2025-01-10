"use client";
import React, { useEffect, useState } from "react";
import AdBanner from "@/components/ADS/AdBanner";
import AdBannerMobile from "@/components/ADS/AdsBannerMobile";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { MdFullscreenExit } from "react-icons/md";
import { FaReadme } from "react-icons/fa";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { useBook } from "@/hooks/useBook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useIsMobile from "@/hooks/isMobile";

const PdfPage = () => {
  const { title, setTitle, urlBook, urlPdfBook } = useBook();



  const pdfUrl =
    "https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/pdf%2Flira-dos-vinte-anos.pdf?alt=media&token=f1fdf453-a0ec-42b5-90ea-74de165a17d0";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const isMobile = useIsMobile()

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (title === "notitle") {
      router.push("/");
      return;
    }
  
    if (isMobile && title.length > 20) {
      setTitle(`${title.slice(0, 20).trim()}...`);
    }
  }, [title, isMobile, router, setTitle]);
  

  if (title === "notitle") return null;

  return (
    <>
      <Navbar />
      <AdBanner
        dataAdFormat=""
        dataFullWidthResponsive={false}
        dataAdSlot="3946512730"
        customClassName="mt-4"
      />
      <AdBannerMobile dataAdSlot="6603126932" customClassName="mt-4 mb-2" />
      <div className="min-h-96 flex items-center justify-center mt-4">
        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-main-500 text-white flex items-center justify-between">
            <span className="font-bold text-lg">{title}</span>
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={openModal}
                className="bg-white text-main-500 px-2 md:px-4 py-2 rounded-full hover:bg-gray-100 transition font-lexend font-normal flex justify-center gap-2 items-center"
              >
                <p className="font-lexend font-normal hidden md:block">Tela cheia</p>
                <MdFullscreenExit size={20} />
              </button>
              {urlBook && (
                <div className="flex gap-4">
                  <Link
                    href={"/leitor"}
                    onClick={openModal}
                    className="bg-white text-main-500 px-2 md:px-4 py-2 rounded-full hover:bg-gray-100 transition font-lexend font-normal flex justify-center gap-2 items-center"
                  >
                    <>
                    <p className="font-lexend font-normal hidden md:block">Ler online</p>
                      <FaReadme size={20} />
                    </>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <iframe
            id="pdf-iframe"
            src={urlPdfBook}
            className="w-full h-[80vh]"
            frameBorder="0"
            title="Lira dos Vinte Anos PDF"
          />
        </div>
      </div>
      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
          <div className="relative w-full h-full">
            <div className="bg-main-500 flex justify-between items-center p-2">
              <button
                onClick={closeModal}
                className="text-black px-4 py-2 rounded-md flex justify-center items-center gap-2"
              >
                <FaCircleChevronLeft color="#fff" size={34} />
                <p className="text-white font-lexend font-normal hidden md:block">Voltar</p>
              </button>
              <span className="font-bold text-lg text-white">
                {title}
              </span>
              {urlBook && (
                <div className="flex gap-4">
                  <Link
                    href={"/leitor"}
                    onClick={openModal}
                    className="bg-white text-main-500 px-4 py-2 rounded-full hover:bg-gray-100 transition font-lexend font-normal flex justify-center gap-2 items-center"
                  >
                    <>
                      Ler online
                      <FaReadme size={20} />
                    </>
                  </Link>
                </div>
              )}
              {!urlBook && <div className="px-4 opacity-0"></div>}
            </div>
            <iframe
              src={urlPdfBook}
              className="w-full h-full"
              frameBorder="0"
              title="Lira dos Vinte Anos PDF"
            />
          </div>
          <AdBanner dataAdSlot="2423907456" fixed />
          <AdBannerMobile dataAdSlot="6603126932" fixed />
        </div>
      )}
    </>
  );
};

export default PdfPage;
