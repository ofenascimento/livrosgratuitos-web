"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { urlApi } from "@/utils/url";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await localStorage.getItem("userToken");
      if (token) {
        router.push("/");
      }
    };
    checkToken();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center mt-6 text-white font-poppins">
        <div className="max-w-md w-full p-4 rounded-lg">
          <button
            onClick={() => router.back()}
            className="bg-gray-700 cursor-pointer rounded-full text-white lg:px-4 p-2 flex gap-2 justify-center items-center"
          >
            <HiChevronLeft />
            <p className=" hidden lg:block"> Voltar</p>
          </button>
          <h2 className="text-4xl font-bold text-center mb-8 text-white mt-6">
            Ainda não é possível criar uma conta 😢
          </h2>
          <div className=" text-center">
            <p>Atualmente o site está em fazendo de teste!</p>
            <br />
            <p>
              Estamos nos dedicando ao máximo pra melhorar o site e trazer a
              melhor experiência de leitura online para você
            </p>
            <br />
            <p>
              Em breve você poderá criar sua conta, favoritar seus livros e
              salvar seu progresso de leitura
            </p>
            <br />
            <p className=" text-main-100 font-semibold text-lg">
              TUDO 100% GRÁTIS!!!!!
            </p>
            <br />
            <p>
              Fica ligado no nosso insta:{" "}
              <Link href="https://www.instagram.com/livrosgratuitos.app/">
                <span className=" cursor-pointer text-main-100 hover:text-main-300">
                  @livrosgratuitos.app
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
