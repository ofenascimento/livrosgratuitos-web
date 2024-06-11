import Image from "next/image";
import React from "react";
import { ICard } from "./types";
import Link from "next/link";

const Card = (props: ICard) => {
  return (
    <Link href={`/livro?bookId=${props.id}`}>
      <div className="flex-shrink-0 bg-gray-700 w-40 shadow-lg flex flex-col justify-center items-center">
        <img
          src={props.capa}
          style={{ width: 160, height: "auto" }}
          className="h-full object-cover    rounded-t"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 w-full">
          <div className="flex flex-col justify-center items-center h-12">
            <h1 className="text-sm text-center font-bold text-white leading-4">
              {props.titulo}
            </h1>
            <span className="text-sm text-white mt-1 text-center">
              {props.autor}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
