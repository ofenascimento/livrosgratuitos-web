"use client";
import React from "react";
import useFetchBooks from "@/hooks/useFetchBooks";
import Image from "next/image";
import Link from "next/link";
import Title from "../Title/Title";
import Card from "../Card/Card";

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
              nos <br className="hidden lg:block" />
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
        <div className="w-full  flex flex-wrap  gap-8 justify-center items-center mt-2">
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
