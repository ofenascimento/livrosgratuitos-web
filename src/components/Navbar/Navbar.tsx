"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { MdPerson, MdFavoriteBorder } from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa";

import SearchInput from "../SearchInput/SearchInput";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
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
              <button className="bg-gray-200 px-3 py-3 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">
                {true ? (
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
                className="p-2 text-black rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
                    viewBox="0 0 20 20"
                    fill="#fff"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          {/* <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 text-white font-medium">
            <li className="">
              <Link href="mailto:contato@qr-code-pix.com.br">Categorias</Link>
            </li>
            <li className="">
              <Link href="mailto:contato@qr-code-pix.com.br">Autores</Link>
            </li>
            <li className="">
              <Link href="mailto:contato@qr-code-pix.com.br">Blog</Link>
            </li>
            <li className="">
              <Link href="mailto:contato@qr-code-pix.com.br">Sobre nós</Link>
            </li>
            <li className="">
              <Link href="mailto:contato@qr-code-pix.com.br">Contato</Link>
            </li>
          </ul> */}
          <SearchInput />
        </div>
        <div>
          {/* Navbar Desktop */}
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 hidden md:block md:pb-0 md:mt-0 `}
          >
            <ul className="flex gap-2 text-white">
              <li>
                <button className="bg-gray-200 px-3 py-3 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">
                  {true ? (
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
                  <h1 className="border-2 border-gray-600 px-6 py-2 rounded-full">
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
