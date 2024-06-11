"use client";
import React from "react";
import useFetchBooks from "@/hooks/useFetchBooks";
import Image from "next/image";
import Link from "next/link";
import Title from "../Title/Title";
import Card from "../Card/Card";
import { IBookCatalog } from "./types";

function BookCatalog({ titulo }: IBookCatalog) {
  const { books } = useFetchBooks({ titulo: titulo ?? "" });

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
                  {titulo}
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
