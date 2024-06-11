"use client";
import React, { useEffect, useState } from "react";
import useFetchBooks from "@/hooks/useFetchBooks";
import Image from "next/image";
import Link from "next/link";
import Title from "../Title/Title";
import Card from "../Card/Card";
import { IBookCatalog } from "./types";
import CardBookSkeleton from "../Skeleton/CardBookSkeleton";

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

  if (!imagesLoaded || isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="w-full flex flex-wrap  gap-8 items-center mt-6">
         
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
              <div className=" text-main-400">
                Buscando por:{" "}
                <span
                  className=" dark:text-white text-black"
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
        <div className="w-full  flex flex-wrap  gap-8 items-center mt-2">
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
