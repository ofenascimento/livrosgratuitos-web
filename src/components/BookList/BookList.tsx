"use client";
import React, { useState, useEffect, useRef } from "react";
import useFetchBooks from "@/hooks/useFetchBooks";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";
import CardBookSkeleton from "../Skeleton/CardBookSkeleton";
import Card from "../Card/Card";
import Title from "../Title/Title";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { IBookList } from "./types";

export default function BookList({ options, label }: IBookList) {
  const { books, isLoading } = useFetchBooks(options);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

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

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: -340,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 340,
        behavior: "smooth",
      });
    }
  };

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
    <>
      <div className=" w-full flex justify-between items-center">
        <Title customClassName="items-start" center title={label} />
        <div className=" md:flex gap-2 hidden">
          <button
            onClick={scrollLeft}
            className=" p-2 bg-gray-700 text-white rounded-full"
          >
            <HiChevronLeft />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 bg-gray-700 text-white rounded-full"
          >
            <HiChevronRight />
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center items-center relative">
        <div
          ref={listRef}
          className="overflow-x-auto w-full py-4 scrollbar-hide"
        >
          <div className="flex gap-4">
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
    </>
  );
}
