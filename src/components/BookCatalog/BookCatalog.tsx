"use client";
import React, { useEffect, useState } from "react";
import useFetchBooks from "@/hooks/useFetchBooks";
import Image from "next/image";
import Link from "next/link";
import Title from "../Title/Title";
import Card from "../Card/Card";
import { IBookCatalog } from "./types";
import CardBookSkeleton from "../Skeleton/CardBookSkeleton";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function BookCatalog({ titulo, categoria }: IBookCatalog) {
  const { books, isLoading } = useFetchBooks({
    titulo: titulo ?? "",
    categoria: categoria ?? "",
  });

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (books.length > 0 && !isLoading) {
      const imagePromises = books.map((book) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = book.capa;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(imagePromises).then(() => {
        setImagesLoaded(true);
      });
    }
  }, [books, isLoading]);

  if (books === null || books.length === 0) {
    return (
      <div>
        <div className=" flex justify-center items-center w-full flex-col">
          <Title
            customClassName="items-start mt-4"
            title={
              <div className=" text-white">
                Nenhum livro foi encontrado para:{" "}
                <span
                  className="text-white"
                  style={{
                    textDecorationColor: "#7B66FF",
                    textDecorationThickness: "5px",
                    textDecorationLine: "underline",
                  }}
                >
                  {titulo || categoria}
                </span>
              </div>
            }
          />
          <Image
            src="/no-book.webp"
            className=" rounded-3xl mb-2"
            width={300}
            height={50}
            alt=""
          />
        </div>
      </div>
    );
  }

  if (!imagesLoaded || isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="w-full flex flex-wrap justify-center  gap-8 items-center mt-6">
          {[...Array(12)].map((_, index) => (
            <CardBookSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center mt-6">
      <div className="container md:px-0">
        <Title
          customClassName="items-start"
          title={
            <>
              <div className=" text-white">
                Buscando por:{" "}
                <span
                  className="text-white"
                  style={{
                    textDecorationColor: "#7B66FF",
                    textDecorationThickness: "5px",
                    textDecorationLine: "underline",
                  }}
                >
                  {titulo || categoria}
                </span>
              </div>
            </>
          }
        />
        <div className="w-full  flex flex-wrap  gap-8 items-center ml-3 md:ml-0 justify-start mt-2">
          {books.map((item, index) => (
            <Card
              key={index}
              id={item._id}
              capa={item.capa}
              titulo={item.titulo}
              autor={item.autor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookCatalog;
