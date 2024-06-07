"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MdPerson, MdFavoriteBorder, MdClose, MdMenu } from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa";

import SearchInput from "../SearchInput/SearchInput";
import { useTheme } from "@/hooks/useTheme";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <nav className="w-full">
      <div className="container justify-between mx-auto md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between md:block">
            <a href="/">
              <img
                src="/logo.png"
                style={{ width: "auto", height: "50px" }}
                alt=""
              />
            </a>
            <div className="md:hidden flex gap-2 justify-center items-center">
              <button
                onClick={toggleTheme}
                className="bg-gray-200 px-3 py-3 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full"
              >
                {theme === "dark" ? (
                  <FaSun color="#A0AFBF" size={20} />
                ) : (
                  <FaMoon size={20} />
                )}
              </button>
              <div className="">
                <Link href="mailto:contato@qr-code-pix.com.br">
                  <div className="flex gap-2 bg-main-400 text-white font-semibold rounded-full px-6 py-2 justify-center items-center">
                    Minha conta
                    <MdPerson size={20} />
                  </div>
                </Link>
              </div>
              <button
                className="p-2 dark:text-white rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? <MdClose size={28} /> : <MdMenu size={28} />}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <SearchInput />
        </div>
        <div>
          {/* Navbar Desktop */}
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 hidden md:block md:pb-0 md:mt-0 `}
          >
            <ul className="flex gap-2 text-white">
              <li>
                <button
                  onClick={toggleTheme}
                  className="bg-gray-200 px-3 py-3 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full"
                >
                  {theme === "dark" ? (
                    <FaSun color="#A0AFBF" size={20} />
                  ) : (
                    <FaMoon size={20} />
                  )}
                </button>
              </li>
              <li>
                <button
                  className="px-3 py-3 rounded-full text-white flex flex-row justify-center items-center gap-2"
                  style={{ backgroundColor: "#FF407D" }}
                >
                  <MdFavoriteBorder size={20} />
                </button>
              </li>
              <li className=" font-semibold ">
                <Link href="mailto:contato@qr-code-pix.com.br">
                  <h1 className="border-2 border-gray-600 px-6 py-2 rounded-full text-black dark:text-white">
                    Entrar
                  </h1>
                </Link>
              </li>
              <li className="">
                <Link href="mailto:contato@qr-code-pix.com.br">
                  <div className="flex gap-2 bg-main-400 hover:bg-main-500 text-white font-semibold rounded-full px-6 py-2 justify-center items-center">
                    Criar conta
                    <MdPerson size={20} />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          {/* Navbar Mobile */}
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:hidden md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 text-white">
              <li className="">
                <Link href="mailto:contato@qr-code-pix.com.br">Login</Link>
              </li>
              <li className="">
                <Link href="mailto:contato@qr-code-pix.com.br">
                  <div className="flex gap-2 bg-main text-white font-medium rounded-full px-6 py-2 justify-center items-center">
                    Minha conta
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
