"use client";
import BookList from "@/components/BookList/BookList";
import Navbar from "@/components/Navbar/Navbar";
import LivroPageSkeleton from "@/components/Skeleton/LivroPageSkeleton";
import { useBook } from "@/hooks/useBook";
import { useFetchBook } from "@/hooks/useFetchBook";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

function Livros() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");
  const { book, isLoading } = useFetchBook(bookId ?? "");
  const [imageLoaded, setImageLoaded] = useState(false);
  const { setTitle, setUrlBook } = useBook();

  useEffect(() => {
    if (book && book.capa) {
      setTitle(book.titulo);
      setUrlBook(book.txt);
      const img = new Image();
      img.src = book.capa;
      img.onload = () => setImageLoaded(true);
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
          <h1 className="text-2xl font-bold text-white">
            {book.titulo}
          </h1>
          <h3 className="my-2 text-white">{book.autor}</h3>
          <div className="flex gap-2">
            {book.categoria.map((item, index) => (
              <div
                key={index}
                className=" bg-gray-700 text-white font-medium rounded-lg px-2 py-1 text-sm "
              >
                {item}
              </div>
            ))}
          </div>
          <p className="mt-2 text-white">{book.descricao}</p>
          <div
            className="flex-col gap-2 mt-2 w-full justify-center items-center hidden md:flex"
            id="desktop-buttons"
          >
            <Link
              href={`/leitor`}
              className="w-full flex justify-center items-center"
            >
              <div className="bg-main-400 hover:bg-main-500 px-4 py-2 rounded-full w-full md:w-2/4 text-center">
                Ler online
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
        className=" fixed bottom-0 left-0 w-full p-4 bg-black md:hidden"
        id="fixed-mobile-buttons"
      >
        <Link
          href={`/leitor?urlContent=${encodeURIComponent(book.txt)}`}
          className="w-full flex justify-center items-center"
        >
          <div className="bg-main-400 hover:bg-main-500 px-4 py-2 font-medium rounded-full w-full md:w-2/4 text-center text-white">
            Ler online
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
            novas histórias
          </>
        }
      />
    </>
  );
}

export default Livros;
