'use client'
import { useFetchBook } from "@/hooks/useFetchBook";
import React from "react";

function Livros() {
  const { book } = useFetchBook();
  const categorias = ["romance", "historia"];
  if(!book) return null;
  return (
    <div className=" text-white flex-col md:flex-row flex mt-4 ">
      <div className="  w-full md:w-[30%] flex justify-center items-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fmemorias-postumas-de-bras-cubas-capa.png?alt=media&token=29d6da15-f3da-41eb-9f41-a2c1891c51d1"
          alt=""
          style={{
            width: 200,
            height: "auto",
          }}
        />
      </div>
      <div className="w-full md:w-[70%] mt-4 md:mt-auto">
        <h1 className="text-2xl font-bold">{book.titulo}</h1>
        <h3 className="my-2">{book.autor}</h3>
        <div className="flex gap-2">
          {book.categoria.map((item) => (
            <div className=" bg-gray-500 rounded-lg px-2 py-1 text-sm ">
              {item}
            </div>
          ))}
        </div>

        <p className="mt-2">
          {book.descricao}
        </p>
        <div className=" flex flex-col gap-2 mt-2 w-full justify-center items-center">
          <button className=" bg-main px-4 py-2 rounded-full w-full  md:w-2/4">
            Ler online
          </button>
          <button className="bg-main px-4 py-2 rounded-full w-full md:w-2/4">
            Baixar PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default Livros;
