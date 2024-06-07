"use client";
import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

export default function SearchInput() {
  return (
    <div className="flex justify-center items-center">
      <div className="gap-2 dark:bg-gray-700 border-2 border-gray-200 dark:border-0 bg-white p-4 flex items-center rounded-full w-full lg:mx-auto md:w-[80%] justify-between">
        <input
          placeholder="Procure pelo título do livro"
          type="text"
          className=" dark:bg-gray-700 w-full lg:w-[400px] outline-none focus:border-none focus:placeholder-transparent text-black font-medium dark:text-white"
        />
       
        <HiOutlineSearch size={18} className=" text-black dark:text-white" />
      </div>
    </div>
  );
}
