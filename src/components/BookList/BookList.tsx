'use client'
import React, { useState, useEffect } from "react";
import useFetchBooks from "@/hooks/useFetchBooks";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";
import CardBookSkeleton from "../Skeleton/CardBookSkeleton";

export default function BookList() {
  const { books, isLoading } = useFetchBooks({ destaque: "true" });
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (books.length > 0 && !isLoading) {
      const imagePromises = books.map((book) => {
        return new Promise((resolve) => {
          const img = new Image();
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
        <div className="overflow-x-auto w-full py-4 scrollbar-hide">
          <div className="flex gap-4">
            {[...Array(8)].map((_, index) => (
              <CardBookSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="overflow-x-auto w-full py-4 scrollbar-hide">
        <div className="flex gap-4">
          {books.map((item, index) => (
            <Link href={`/livro?bookId=${item._id}`} key={index}>
              <div className="flex-shrink-0 w-40 bg-gray-800 shadow-lg flex flex-col justify-center items-center">
                <img
                  src={item.capa}
                  style={{ width: 200, height: "auto" }}
                  className="h-full object-cover"
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 w-full">
                  <div className="flex flex-col justify-center items-center h-12">
                    <h1 className="text-sm text-center font-bold text-white leading-4">
                      {item.titulo}
                    </h1>
                    <span className="text-sm text-white mt-1">
                      {item.autor}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
