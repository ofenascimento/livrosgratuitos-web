"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

export default function SearchInput() {
  const [inputValue, setInputValue] = useState<string>();
  const router = useRouter();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/buscar?s=${inputValue}`);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="gap-2  bg-gray-700 p-4 flex items-center rounded-full w-full lg:mx-auto md:w-[80%] justify-between">
        <input
          placeholder="Procure pelo título do livro"
          type="text"
          onKeyDown={handleKeyDown}
          className=" bg-gray-700 w-full lg:w-[400px] outline-none focus:border-none focus:placeholder-transparent font-light font-lexend text-white"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <HiOutlineSearch
          size={18}
          className="text-white cursor-pointer"
          onClick={() => router.push(`/buscar?s=${inputValue}`)}
        />
      </div>
    </div>
  );
}
