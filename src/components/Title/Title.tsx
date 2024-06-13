"use client";
import React from "react";
import { ITitle } from "./types";

const Title = (props: ITitle) => {
  return (
    <>
      <div
        className={`${props.customClassName} flex flex-col justify-center font-PoppinsMedium `}
      >
        <h1
          className={`text-2xl md:text-2xl lg:text-2xl text-white  font-black text-center ${props.titleClassName}`}
        >
          {props.title}
        </h1>
        <p className="text-center text-bold text-gray-600 font-PoppinsMedium w-auto md:w-2/4 mt-2 font-semibold">
          {props.description}
        </p>
      </div>
    </>
  );
};

export default Title;
