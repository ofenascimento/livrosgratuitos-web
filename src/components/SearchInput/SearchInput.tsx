"use client";
import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

export default function SearchInput() {
  return (
    <div className="flex justify-center items-center  mt-2">
      <div className="gap-2 bg-gray-700 p-4 flex items-center rounded-xl w-full lg:mx-auto md:w-[80%] justify-between">
        <input
          placeholder="Procure pelo título do livro"
          type="text"
          className=" bg-gray-700 w-full lg:w-[400px] outline-none focus:border-none focus:placeholder-transparent text-white"
        />
        <HiOutlineSearch size={18} color="#ffffff" />
      </div>
    </div>
  );
}
