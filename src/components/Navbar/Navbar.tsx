"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  MdPerson,
  MdFavoriteBorder,
  MdClose,
  MdMenu,
  MdBookmarkAdded,
  MdBookmarks,
  MdMenuBook,
  MdBook,
} from "react-icons/md";
import { FaCheckDouble, FaMoon, FaSun } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";

import SearchInput from "../SearchInput/SearchInput";
import useAuth from "@/hooks/useAuth";
import Tooltip from "../Tooltip/Tooltip";
import ModalLogin from "../Modals/ModalLogin/ModalLogin";

export default function Navbar() {
  const isAuth = useAuth();
  const [navbar, setNavbar] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState<boolean>(false);

  return (
    <div className="w-full">
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
            <ModalLogin isOpen={isModalLoginOpen} onClose={() => setIsModalLoginOpen(false)} />
            <div className="md:hidden flex gap-2 justify-center items-center">
              <div>
                {isAuth ? (
                  <>
                    
                      <Link href="/minha-conta">
                        <div className="flex gap-2 bg-main-400 hover:bg-main-500 text-white font-semibold rounded-full px-6 py-2 justify-center items-center">
                          Minha conta
                          <MdPerson size={20} />
                        </div>
                      </Link>
                   
                  </>
                ) : (
                  <div className=" flex justify-center items-center gap-2">

                    <button onClick={() => setIsModalLoginOpen(true)}>
                      <h1 className="border-2 border-gray-600 px-6 py-2 rounded-full text-white font-semibold">
                        Entrar
                      </h1>
                    </button>


                    <Link href="/criar-conta">
                      <div className="flex gap-2 bg-main-400 hover:bg-main-500 text-white font-semibold rounded-full px-6 py-2 justify-center items-center">
                        Criar conta
                        <MdPerson size={20} />
                      </div>
                    </Link>

                  </div>
                )}
              </div>
              {/* <button
                className="p-2 text-white rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? <MdClose size={28} /> : <MdMenu size={28} />}
              </button> */}
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
                <Tooltip text="Favoritos">
                  <Link
                    href="/favoritos"
                    className="px-3 py-3 rounded-full text-white flex flex-row justify-center items-center gap-2"
                    style={{ backgroundColor: "#FF407D" }}
                  >
                    <MdBook size={20} />
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip text="Livros em progresso">
                  <Link
                    href="/livros-progresso"
                    style={{ backgroundColor: "#C24914" }}
                    className=" px-3 py-3  text-gray-200 rounded-full flex justify-center items-center"
                  >
                    <MdMenuBook size={20} />
                  </Link>
                </Tooltip>
              </li>

              <li>
                <Tooltip text="Livros finalizados">
                  <Link
                    href="/livros-finalizados"
                    style={{ backgroundColor: "#468966" }}
                    className="px-3 py-3 bg-gray-800 rounded-full text-white flex flex-row justify-center items-center gap-2"
                  >
                    <FaCheckDouble />
                  </Link>
                </Tooltip>
              </li>
              {isAuth ? (
                <>
                  <li className="">
                    <Link href="/minha-conta">
                      <div className="flex gap-2 bg-main-400 hover:bg-main-500 text-white font-semibold rounded-full px-6 py-2 justify-center items-center">
                        Minha conta
                        <MdPerson size={20} />
                      </div>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className=" font-semibold ">
                    <button onClick={() => setIsModalLoginOpen(true)}>
                      <h1 className="border-2 border-gray-600 px-6 py-2 rounded-full text-white">
                        Entrar
                      </h1>
                    </button>
                  </li>
                  <li className="">
                    <Link href="/criar-conta">
                      <div className="flex gap-2 bg-main-400 hover:bg-main-500 text-white font-semibold rounded-full px-6 py-2 justify-center items-center">
                        Criar conta
                        <MdPerson size={20} />
                      </div>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* Navbar Mobile */}
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:hidden md:pb-0 md:mt-0 h-screen ${navbar ? "block" : "hidden"
              }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 text-white">
              <li className="">
                <Link href="/login">Login</Link>
              </li>
              <>
                {isAuth ? (
                  <>
                    <Link href="/minha-conta">
                      <div className="flex gap-2 bg-main-400 hover:bg-main-500 text-white font-semibold rounded-full px-6 py-2 justify-center items-center">
                        Minha conta
                        <MdPerson size={20} />
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <li className=" font-semibold ">
                      <button onClick={() => setIsModalLoginOpen(true)}>
                        <h1 className="border-2 border-gray-600 px-6 py-2 rounded-full text-white">
                          Entrar
                        </h1>
                      </button>
                    </li>
                    <li className="">
                      <Link href="/criar-conta">
                        <div className="flex gap-2 bg-main-400 hover:bg-main-500 text-white font-semibold rounded-full px-6 py-2 justify-center items-center">
                          Criar conta
                          <MdPerson size={20} />
                        </div>
                      </Link>
                    </li>
                  </>
                )}
              </>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
