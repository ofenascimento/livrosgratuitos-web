"use client";
import React from "react";
import useFetchBooks from "@/hooks/useFetchBooks";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";

export default function BookList() {
  const { books, isLoading } = useFetchBooks({ q: "8", categoria: 'Romance' });

  if (isLoading) return <Loader />;

  return (
    <div className="w-full flex justify-center items-center flex-wrap">
      <div className="flex flex-wrap justify-center items-center mt-4 w-full gap-3 lg:gap-1">
        {books.map((item, index) => (
          <div
            key={index}
            className="flex border-2 border-gray-600 shadow-sm bg-gray-800   bg-dark-blue w-96 rounded-md"
          >
            <div className="w-[24%]">
              <img
                src={item.capa}
                className="h-full w-full object-cover  rounded-l-md"
                alt=""
              />
            </div>
            <div className="flex flex-col flex-grow justify-between p-4 w-[70%]">
              <div className=" flex flex-col">
                <h1 className="text-sm font-bold text-white leading-4">
                  {item.titulo}
                </h1>
                <span className=" text-sm text-white mt-1">{item.autor}</span>
              </div>
              <Link href={"/livro"}>
                <div className="hover:bg-main-900  text-white text-sm  font-semibold  cursor-pointer rounded-lg bg-main  p-[0.12rem] mt-2">
                  {" "}
                  <span className=" text-center block text-sm rounded-md bg-slate-900 px-6 py-3 font-medium text-white">
                    Ler agora
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
