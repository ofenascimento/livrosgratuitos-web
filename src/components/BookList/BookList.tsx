"use client";
import React, { useState, useEffect } from "react";
import useFetchBooks from "@/hooks/useFetchBooks";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";
import CardBookSkeleton from "../Skeleton/CardBookSkeleton";
import Card from "../Card/Card";

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
            <Card key={index} id={item._id} capa={item.capa} titulo={item.titulo} autor={item.autor} />
          ))}
        </div>
      </div>
    </div>
  );
}
