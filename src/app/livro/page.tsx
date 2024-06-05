"use client";
import Discover from "@/components/DiscoverList/DiscoverList";
import LivroPageSkeleton from "@/components/Skeleton/LivroPageSkeleton";
import Title from "@/components/Title/Title";
import { useFetchBook } from "@/hooks/useFetchBook";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";


function Livros() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");
  const { book, isLoading } = useFetchBook(bookId ?? "");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (book && book.capa) {
      const img = new Image();
      img.src = book.capa;
      img.onload = () => setImageLoaded(true);
    }
  }, [book]);

  if (isLoading || !book || !imageLoaded) {
    return <LivroPageSkeleton />;
  }

  return (
    <div>
      <div className=" text-white flex-col md:flex-row flex mt-4 ">
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
          <h1 className="text-2xl font-bold">{book.titulo}</h1>
          <h3 className="my-2">{book.autor}</h3>
          <div className="flex gap-2">
            {book.categoria.map((item, index) => (
              <div
                key={index}
                className=" bg-gray-500 rounded-lg px-2 py-1 text-sm "
              >
                {item}
              </div>
            ))}
          </div>
          <p className="mt-2">{book.descricao}</p>
          <div className=" flex flex-col gap-2 mt-2 w-full justify-center items-center">
            <Link
              href={`/leitor?urlContent=${encodeURIComponent(book.txt)}`}
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
      <Title customClassName="items-start mt-8" title="Veja também" />
      <Discover />
    </div>
  );
}

export default Livros;
