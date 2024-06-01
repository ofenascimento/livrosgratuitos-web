"use client";
import React from "react";
import useFetchBooks from "@/hooks/useFetchBooks";
import Image from "next/image";
import Link from "next/link";
import Title from "../Title/Title";

function BookCatalog() {
  const { books } = useFetchBooks({ q: "9", sort: "true" });

  return (
    <div className="w-full flex flex-col justify-center items-center mt-10">
      <div className="container px-4 md:px-0">
        <Title
        center
          title={
            <>
              Dá uma 👀{"  "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg,#6e48ff 0,#cf40ff 48%,#ffa22c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                olhadinha
              </span>{" "}
              nos {" "} <br className="hidden lg:block" />
              <span
                style={{
                  textDecorationColor: "#7B66FF",
                  textDecorationThickness: "5px",
                  textDecorationLine: "underline",
                }}
              >
                destaques
              </span>
              {"  "} da semana
            </>
          }
        />
        <div className="w-full  flex flex-wrap justify-center items-center mt-2">
          {books.map((item, index) => (
            <div className="w-full md:w-2/4 lg:w-1/3" key={index}>
              <div className="border-2 border-gray-600 rounded shadow-sm bg-gray-800 flex m-2 items-center justify-center">
                <Image src={item.capa} width={100} height={100} alt="" />
                <div className="ml-6 w-full h-full flex flex-col items-start justify-between font-poppins">
                  <div className="flex-grow mt-4">
                    <h2 className="font-semibold text-sm text-white font-inter">
                      {item.titulo}
                    </h2>
                    <h2 className="font-light text-sm pr-4 text-gray-400 ">
                      {item.autor}
                    </h2>
                  </div>
                  <Link
                    className=" mt-4 text-center text-white font-medium w-9/10 rounded-md animate-border inline-block bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-[0.12rem] text-sm mb-4"
                    href={`/`}
                  >
                    <span className="block text-sm rounded-md bg-slate-900 px-6 py-3 font-medium text-white">
                      Ler agora
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookCatalog;
