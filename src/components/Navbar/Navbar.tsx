"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdBook,
  MdLogout,
  MdMenuBook,
  MdPerson
} from "react-icons/md";

import useAuth from "@/hooks/useAuth";
import ModalCreateAccount from "../Modals/ModalCreateAccount/ModalCreateAccount";
import ModalLogin from "../Modals/ModalLogin/ModalLogin";
import SearchInput from "../SearchInput/SearchInput";
import Tooltip from "../Tooltip/Tooltip";

export default function Navbar() {
  const isAuth = useAuth();
  const [isModalLoginOpen, setIsModalLoginOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalCreateAccountOpen, setIsModalCreateAccountOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const handleClick = () => setIsMenuOpen(false);
    if (isMenuOpen) {
      window.addEventListener("click", handleClick);
    }
    return () => window.removeEventListener("click", handleClick);
  }, [isMenuOpen]);

  return (
    <div className="w-full">
      <div className="container justify-between mx-auto md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between md:block">
            <a href="/">
              <img
                src="/logo.png"
                style={{ width: "auto", height: "60px" }}
                alt=""
              />
            </a>
            <ModalLogin
              isOpen={isModalLoginOpen}
              onClose={() => setIsModalLoginOpen(false)}
            />
            <ModalCreateAccount
              isOpen={isModalCreateAccountOpen}
              onClose={() => setIsModalCreateAccountOpen(false)}
            />
            <div className="md:hidden flex gap-2 justify-center items-center">
              <div>
                {isAuth ? (
                  <div className=" flex justify-center items-center gap-2">
                    <Link
                      href="/favoritos"
                      className="px-3 py-3 rounded-full text-white flex flex-row justify-center items-center gap-2"
                      style={{ backgroundColor: "#FF407D" }}
                    >
                      <MdBook size={20} />
                    </Link>

                    <Link
                      href="/livros-progresso"
                      style={{ backgroundColor: "#C24914" }}
                      className=" px-3 py-3  text-gray-200 rounded-full flex justify-center items-center"
                    >
                      <MdMenuBook size={20} />
                    </Link>


                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMenuOpen(!isMenuOpen);
                        }}
                        className="flex gap-2 bg-main-400 hover:bg-main-500 text-white font-semibold rounded-full px-3 py-3 justify-center items-center"
                      >
                        <MdPerson size={20} />
                      </button>

                      {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-gray-900 border border-white/10 rounded-xl overflow-hidden z-50">
                          <Link
                            href="/minha-conta"
                            className="flex items-center gap-2.5 px-4 py-3 text-sm text-white font-semibold hover:bg-white/5 border-b border-white/10 transition-colors"
                          >
                            <MdPerson size={16} className="opacity-60" />
                            Editar perfil
                          </Link>

                          <div
                            onClick={() => {
                              localStorage.removeItem("userToken");
                              window.location.reload();
                            }}
                            className="flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 font-semibold hover:bg-red-500/10 cursor-pointer transition-colors"
                          >
                            <MdLogout size={16} />
                            Sair
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className=" flex justify-center items-center gap-2">
                    <button onClick={() => setIsModalLoginOpen(true)}>
                      <h1 className="border-2 border-gray-600 px-6 py-2 rounded-full text-white font-semibold">
                        Entrar
                      </h1>
                    </button>

                    <button onClick={() => setIsModalCreateAccountOpen(true)}>
                      <div className="flex gap-2 bg-main-400 hover:bg-main-500 text-white font-semibold rounded-full px-6 py-2 justify-center items-center">
                        Criar conta
                        <MdPerson size={20} />
                      </div>
                    </button>
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

              {isAuth ? (
                <>
                  <li className="">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMenuOpen(!isMenuOpen);
                        }}
                        className="flex gap-2 bg-main-400 hover:bg-main-500 text-white font-semibold rounded-full px-6 py-2 items-center"
                      >
                        Minha conta
                        <MdPerson size={20} />
                      </button>

                      {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-gray-900 border border-white/10 rounded-xl overflow-hidden z-50">
                          <Link
                            href="/minha-conta"
                            className="flex items-center gap-2.5 px-4 py-3 text-sm text-white font-redRat font-semibold hover:bg-white/5 border-b border-white/10 transition-colors"
                          >
                            <MdPerson size={16} className="opacity-60" />
                            Editar perfil
                          </Link>

                          <div
                            onClick={() => {
                              localStorage.removeItem("userToken");
                              window.location.reload();
                            }}
                            className="flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 font-redRat font-semibold hover:bg-red-500/10 cursor-pointer transition-colors"
                          >
                            <MdLogout size={16} />
                            Sair
                          </div>
                        </div>
                      )}
                    </div>
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
                    <button onClick={() => setIsModalCreateAccountOpen(true)}>
                      <div className="flex gap-2 bg-main-400 hover:bg-main-500 text-white font-semibold rounded-full px-6 py-2 justify-center items-center">
                        Criar conta
                        <MdPerson size={20} />
                      </div>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
