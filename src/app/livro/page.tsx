"use client";
import AdBanner from "@/components/ADS/AdBanner";
import AdBannerMobile from "@/components/ADS/AdsBannerMobile";
import BookList from "@/components/BookList/BookList";
import CustomLayout from "@/components/CustomLayout/CustomLayout";
import Footer from "@/components/Footer/Footer";
import Metadata from "@/components/Metadata";
import ModalLogin from "@/components/Modals/ModalLogin/ModalLogin";
import ModalShare from "@/components/Modals/ModalShare/ModalShare";
import Navbar from "@/components/Navbar/Navbar";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import LivroPageSkeleton from "@/components/Skeleton/LivroPageSkeleton";
import { addBookToReadingBook } from "@/hooks/addBookToReadingList";
import { addFavoriteBook } from "@/hooks/addFavoriteBook";
import { removeFavoriteBook } from "@/hooks/removeFavoriteBook";
import useAuth from "@/hooks/useAuth";
import { useBook } from "@/hooks/useBook";
import { useFetchBook } from "@/hooks/useFetchBook";
import useFetchBookAuth from "@/hooks/useFetchBookAuth";
import useCopyToClipboard from "@/utils/useToClipboard";
import Head from "next/head";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaFilePdf } from "react-icons/fa";
import { MdOutlineShare } from "react-icons/md";
import { PiFilePdf } from "react-icons/pi";


function Livros() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");
  const { book, isLoading } = useFetchBook(bookId ?? "");
  const [imageLoaded, setImageLoaded] = useState(false);
  const { setTitle, setUrlBook, setBookId, setPdfUrlBook } = useBook();
  const [isFavorited, setIsFavorited] = useState<boolean | null>(null);
  const { setToParagraph, toParagraph } = useBook();
  const [modalShareIsOpen, setModalShareIsOpen] = useState<boolean>(false);
  const [modalLoginIsOpen, setModalLoginIsOpen] = useState<boolean>(false);
  const [fullUrl, setFullUrl] = useState<string>("");
  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);

  const isAuth = useAuth();
  const { isCopied, copyText } = useCopyToClipboard()


  const isInstagramWebView = (): boolean => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return false;
    return navigator.userAgent.toLowerCase().includes("instagram");
  };


  useEffect(() => {
    if (isInstagramWebView()) {
      setIsInstagramModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, []);


  useEffect(() => {
    if (book && book.capa) {
      setTitle(book.titulo);
      setUrlBook(book.txt);
      if (book.pdf) {
        setPdfUrlBook(book.pdf);
      }
      setBookId(book._id);
      setIsFavorited(book.isFavorite ?? false);
      const img = new Image();
      img.src = book.capa;
      img.onload = () => setImageLoaded(true);
      setToParagraph(book.currentParagraph ?? 0);
      // console.log(toParagraph);
    }
  }, [book]);

  if (isLoading || !book || !imageLoaded) {
    return <LivroPageSkeleton />;
  }


  return (
    <>
      <CustomLayout>
        <Metadata seoTitle={book.titulo} seoDescription={book.descricao} />
        <Navbar />
        <AdBanner
          dataAdFormat=""
          dataFullWidthResponsive={false}
          dataAdSlot="3946512730"
          customClassName="mt-4"
        />
        <AdBannerMobile dataAdSlot="6603126932" customClassName="mt-4" />
        <div className=" text-white flex-col md:flex-row flex mt-6 md:mt-4 mb-6 ">
          <div className="w-full md:w-[30%] flex justify-center items-center">
            <img
              src={book.capa}
              alt=""
              style={{
                width: 200,
                height: "auto",
              }}
            />
          </div>
          <div className="w-full md:w-[70%] lg:w-[80%] mt-4 md:mt-auto">
            <div className=" flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">{book.titulo}</h1>

              <div className=" flex justify-center items-center gap-2">
                <div>
                  {isFavorited ? (
                    <button
                      className="rounded-full border border-slate-600 bg-dark-background p-3 lg:px-4 lg:py-2 flex justify-center items-center gap-3"
                      onClick={() => {
                        removeFavoriteBook(book._id);
                        setIsFavorited(false);
                      }}
                    >
                      <svg
                        className="text-[#FF407D]"
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="currentColor"
                      >
                        <path d="M734-313 615-432l51-51 68 68 136-136 51 51-187 187ZM432-480Zm0 360-108-96q-79-70-132-124t-85-99q-32-45-45.5-84.5T48-605q0-89 60.5-150T257-816q50 0 96.5 21t78.5 59q32.3-38.1 76.95-59.05Q553.6-816 603-816q78 0 136.5 47.5T812-648h-75q-14-42-50-69t-84-27q-57 0-87.5 28.5T452-648h-40q-34-40-65.5-68T257-744q-57 0-97 40t-40 99q0 31.37 12.5 63.68 12.5 32.32 47 75.82 34.5 43.5 95 103T432-217q25-22 73.5-65t68.5-62l8.05 8.05 17.45 17.45 17.45 17.45L625-293q-21 20-46 42t-41 36l-106 95Z" />
                      </svg>
                      <p className="hidden lg:block font-lexend font-light">Favoritado</p>
                    </button>
                  ) : (
                    <button
                      className="rounded-full border border-slate-600 bg-dark-background p-3 lg:px-4 lg:py-2  flex justify-center items-center gap-3"
                      onClick={() => {
                        if (isAuth) {
                          addFavoriteBook(book._id);
                          setIsFavorited(true);
                        } else {
                          setModalLoginIsOpen(true);
                        }
                      }}
                    >
                      <svg
                        className="text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="currentColor"
                      >
                        <path d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm280-160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z" />
                      </svg>
                      <p className="hidden lg:block font-lexend font-light">Favoritar</p>
                    </button>
                  )}
                </div>
                <button
                  className="rounded-full border border-slate-600 bg-dark-background p-3 lg:px-4 lg:py-2 flex justify-center items-center gap-3"
                  onClick={() => setModalShareIsOpen(true)}
                >
                  <MdOutlineShare />

                  <p className="hidden lg:block font-lexend font-light">Compartilhar</p>
                </button>
              </div>
            </div>

            <h3 className="mb-2 text-white font-lexend">{book.autor}</h3>
            <div className="flex gap-2 mb-4">
              {book.categoria.map((item, index) => (
                <div
                  key={index}
                  className=" bg-gray-700 text-white font-medium rounded-lg px-2 py-1 text-sm "
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-2 text-white font-lexend font-light">
              {book.descricao}
            </p>
            {book.pdf && (
              <Link
                href={`https://pdf.livrosgratuitos.com/livro?id=${book._id}`}
                className="w-full"
              >
                <div className="w-full bg-[#F72C5B] bg-main my-2 md:hidden px-4 py-2 rounded-full  text-center">
                  Ver PDF
                </div>

              </Link>
            )}
            <div
              className="flex-col gap-2 mt-2 lg:mt-4 w-full justify-center items-center hidden md:flex"
              id="desktop-buttons"
            >
              {book.txt !== "" && (
                <Link
                  href={`/leitor`}
                  className="w-full flex justify-center items-center"
                  onClick={() => {
                    !book.currentParagraph || book.currentParagraph === 0
                      ? addBookToReadingBook(book._id)
                      : null;
                  }}
                >
                  <div className="bg-main-400 hover:bg-main-500 px-4 py-2 rounded-full w-full md:w-2/4 text-center font-lexend font-light">
                    {book.currentParagraph &&
                      book.currentParagraph !== 0 &&
                      book.progressPercentage !== undefined &&
                      book.progressPercentage > 0
                      ? "Continuar leitura"
                      : "Ler online"}
                  </div>
                </Link>
              )}
              {book.progressPercentage !== undefined &&
                book.progressPercentage > 0 &&
                book.currentParagraph !== 0 && (
                  <div className="md:w-2/4">
                    <ProgressBar progress={book.progressPercentage ?? 0} />
                    <div className="w-full text-center mt-2 font-lexend font-light">
                      Progresso: {book.progressPercentage}%
                    </div>
                  </div>
                )}

              {book.pdf && (
                <Link
                  href={`https://pdf.livrosgratuitos.com/livro?id=${book._id}`}
                  className="md:w-2/4"
                >
                  <div className="w-full bg-[#F72C5B] bg-main hidden md:block px-4 py-2 rounded-full  text-center">
                    Ver PDF
                  </div>

                </Link>
              )}
            </div>
          </div>
        </div>

        <div
          className=" fixed bottom-0  z-50 left-0 w-full p-4 bg-black md:hidden"
          id="fixed-mobile-buttons"
        >
          {book.txt !== "" && (
            <Link
              href={`/leitor`}
              className="w-full flex justify-center items-center"
              onClick={() => {
                !book.currentParagraph || book.currentParagraph === 0
                  ? addBookToReadingBook(book._id)
                  : null;
              }}
            >
              <div className="bg-main-400 hover:bg-main-500 px-4 py-2 font-medium rounded-full w-full md:w-2/4 text-center text-white">
                {book.currentParagraph &&
                  book.currentParagraph !== 0 &&
                  book.progressPercentage !== undefined &&
                  book.progressPercentage > 0
                  ? "Continuar leitura"
                  : "Ler online"}{" "}
              </div>
            </Link>
          )}
          {book.progressPercentage !== 0 &&
            book.progressPercentage !== undefined &&
            book.progressPercentage > 0 && (
              <div className="mt-3 mb-3">
                <ProgressBar progress={book.progressPercentage ?? 0} />
                <div className=" w-full text-center mt-2 font-lexend font-light">
                  Progresso: {book.progressPercentage}%
                </div>
              </div>
            )}
        </div>
        <AdBanner
          dataAdFormat=""
          dataFullWidthResponsive={false}
          dataAdSlot="2423907456"
          customClassName="mb-4"
        />
        <BookList
          options={{ q: "9", sort: "true" }}
          label={
            <>
              <span
                style={{
                  background:
                    "linear-gradient(90deg,#6e48ff 0,#cf40ff 48%,#ffa22c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Descubra
              </span>{" "}
              novas histórias 🚀
            </>
          }
        />
        <Footer />
        <ModalShare
          bookName={book.titulo}
          isOpen={modalShareIsOpen}
          bookImage={book.capa}
          onClose={() => setModalShareIsOpen(false)}
        />
        <ModalLogin
          isOpen={modalLoginIsOpen}
          onClose={() => setModalLoginIsOpen(false)}
        />
        {isInstagramModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
              <h2 className="text-xl font-bold text-gray-800">Abra no navegador</h2>
              <p className="text-gray-600 mt-2">
                Infelizmente o livro não pode ser aberto pelo navegador do instagram. Copie o link e cole no seu navegador de preferência.

              </p>
              <div className="bg-indigo-200 rounded-lg mt-2 py-2">
                <span className=" text-main-500 font-semibold">{fullUrl}</span>
              </div>
              <button
                className="mt-4 bg-main-600 font-semibold text-white px-4 py-2 rounded-md w-full"
                onClick={() => {
                  copyText(fullUrl)
                }}
              >
                {isCopied ? 'Link copiado' : 'Copiar link'}
              </button>

            </div>
          </div>
        )}

      </CustomLayout>
    </>
  );
}

export default Livros;
