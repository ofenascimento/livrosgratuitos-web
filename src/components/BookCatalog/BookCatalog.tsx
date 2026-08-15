"use client";
import React, { useEffect, useState } from "react";
import { useBooksList } from "@/hooks/useBooks";
import Image from "next/image";
import Title from "../Title/Title";
import Card from "../Card/Card";
import { IBookCatalog } from "./types";
import CardBookSkeleton from "../Skeleton/CardBookSkeleton";

function BookCatalog({ title, categories }: IBookCatalog) {
  const { books, isLoading } = useBooksList({
    title: title ?? "",
    categories: categories ?? "",
  });

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [booksChecked, setBooksChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setBooksChecked(true);
    }

    if (books && books.length > 0 && !isLoading) {
      const imagePromises = books.map((book: IBooks) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = book.cover;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(imagePromises).then(() => {
        setImagesLoaded(true);
      });
    }
  }, [books, isLoading]);

  if (isLoading || !booksChecked || (books.length > 0 && !imagesLoaded)) {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="w-full flex flex-wrap justify-center gap-8 items-center mt-6">
          {[...Array(12)].map((_, index) => (
            <CardBookSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div>
        <div className="flex justify-center items-center w-full flex-col">
          <Title
            customClassName="items-start mt-4"
            title={
              <div className="text-white">
                Nenhum livro foi encontrado para:{" "}
                <span
                  className="text-white"
                  style={{
                    textDecorationColor: "#7B66FF",
                    textDecorationThickness: "5px",
                    textDecorationLine: "underline",
                  }}
                >
                  {title || categories}
                </span>
              </div>
            }
          />
          <Image
            src="/no-book.webp"
            className="rounded-3xl mb-2"
            width={300}
            height={50}
            alt=""
          />
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
              <div className="text-white">
                Buscando por:{" "}
                <span
                  className="text-white"
                  style={{
                    textDecorationColor: "#7B66FF",
                    textDecorationThickness: "5px",
                    textDecorationLine: "underline",
                  }}
                >
                  {title || categories}
                </span>
              </div>
            </>
          }
        />
        <div className="w-full flex flex-wrap gap-4 items-center justify-center mt-2">
          {books.map((item: IBooks, index: number) => (
            <Card
              key={index}
              id={item._id}
              capa={item.cover}
              titulo={item.title}
              autor={item.author}
              slug={item.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookCatalog;