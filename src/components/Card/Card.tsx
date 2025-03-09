import React from "react";
import { ICard } from "./types";
import Link from "next/link";
import ProgressBar from "../ProgressBar/ProgressBar";

const Card = (props: ICard): React.ReactElement => {
  return (
    <Link href={`${props.slug ? `/${props.slug}`: `/livro?bookId=${props.id}`}`}>
      <div className="flex-shrink-0 w-40 shadow-lg flex flex-col justify-center items-center">
        <img
          src={props.capa}
          style={{ width: 160, height: "auto" }}
          className="h-full object-cover rounded-md"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 w-full mt-2">
          <div className="flex flex-col justify-center items-center h-12">
            <h1 className="text-sm text-center font-bold text-white leading-4">
              {props.titulo}
            </h1>
            {props.autor && (
              <span className="text-sm text-white mt-1 text-center font-lexend font-light">
                {props.autor}
              </span>
            )}

            {props.progress && (
              <>
                <span className="text-sm  text-center mt-1 font-lexend font-light text-gray-300">
                  {`Progresso: ${props.progress}%`}
                </span>
                <ProgressBar progress={props.progress} />
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
