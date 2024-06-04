"use client";
import React from "react";
import useFetchBooks from "@/hooks/useFetchBooks";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";

export default function Discover() {
  const { books, isLoading } = useFetchBooks({ q: '9', sort: 'true' });

  if (isLoading) return <Loader />;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="overflow-x-auto w-full py-4 scrollbar-hide">
        <div className="flex gap-4">
          {books.map((item, index) => (
            <Link href={`/livro?bookId=${item._id}`}>
              <div
                key={index}
                className="flex-shrink-0 w-40 bg-gray-800 shadow-lg flex flex-col justify-center items-center"
              >
                <img src={item.capa} style={{width: 200, height: 'auto'}} className=" h-full object-cover" alt="" />

                <div className="flex flex-col justify-between p-4 w-full">
                  <div className="flex flex-col justify-center items-center h-14">
                    <h1 className="text-sm text-center font-bold text-white leading-4">
                      {item.titulo}
                    </h1>
                    <span className="text-sm text-white mt-1">
                      {item.autor}
                    </span>
                  </div>
                  {/* <Link href={`/livro?bookId=${item._id}`}>
                  <div className="hover:bg-main-900 text-white text-sm font-semibold cursor-pointer rounded-lg bg-main p-[0.12rem] mt-2">
                    <span className="text-center block text-sm rounded-md bg-slate-900 px-6 py-3 font-medium text-white">
                      Ler agora
                    </span>
                  </div>
                </Link> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
