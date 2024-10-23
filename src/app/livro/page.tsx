"use client";
import BookList from "@/components/BookList/BookList";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import LivroPageSkeleton from "@/components/Skeleton/LivroPageSkeleton";
import { addBookToReadingBook } from "@/hooks/addBookToReadingList";
import { addFavoriteBook } from "@/hooks/addFavoriteBook";
import { removeFavoriteBook } from "@/hooks/removeFavoriteBook";
import useAuth from "@/hooks/useAuth";
import { useBook } from "@/hooks/useBook";
import { useFetchBook } from "@/hooks/useFetchBook";
import useFetchBookAuth from "@/hooks/useFetchBookAuth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

function Livros() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");
  const { book, isLoading } = useFetchBook(bookId ?? "");
  const [imageLoaded, setImageLoaded] = useState(false);
  const { setTitle, setUrlBook, setBookId } = useBook();
  const [isFavorited, setIsFavorited] = useState<boolean | null>(null);
  const { setToParagraph, toParagraph } = useBook();

  useEffect(() => {
    if (book && book.capa) {
      setTitle(book.titulo);
      setUrlBook(book.txt);
      setBookId(book._id);
      setIsFavorited(book.isFavorite ?? false);
      const img = new Image();
      img.src = book.capa;
      img.onload = () => setImageLoaded(true);
      setToParagraph(book.currentParagraph ?? 0);
      console.log(toParagraph);
    }
  }, [book]);

  if (isLoading || !book || !imageLoaded) {
    return <LivroPageSkeleton />;
  }

  return (
    <>
      <Navbar />
      <div className=" text-white flex-col md:flex-row flex mt-8 mb-6 ">
        <div className="  w-full md:w-[30%] flex justify-center items-center">
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
                  <p className="hidden lg:block">Favoritado</p>
                </button>
              ) : (
                <button
                  className="rounded-full border border-slate-600 bg-dark-background p-3 lg:px-4 lg:py-2  flex justify-center items-center gap-3"
                  onClick={() => {
                    addFavoriteBook(book._id);
                    setIsFavorited(true);
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
                  <p className="hidden lg:block">Favoritar livro</p>
                </button>
              )}
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
          <div
            className="flex-col gap-2 mt-2 lg:mt-4 w-full justify-center items-center hidden md:flex"
            id="desktop-buttons"
          >
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
                {book.currentParagraph && book.currentParagraph !== 0
                  ? "Continuar leitura"
                  : "Ler online"}
              </div>
            </Link>

            {book.pdf && (
              <button className="bg-main px-4 py-2 rounded-full w-full md:w-2/4">
                Baixar PDF
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        className=" fixed bottom-0  z-50 left-0 w-full p-4 bg-black md:hidden"
        id="fixed-mobile-buttons"
      >
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
            {book.currentParagraph && book.currentParagraph !== 0
              ? "Continuar leitura"
              : "Ler online"}{" "}
          </div>
        </Link>
      </div>
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
    </>
  );
}

export default Livros;
