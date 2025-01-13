"use client";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

const AccountPage = () => {
  const isAuth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuth !== undefined) {
      setLoading(false);
      if (!isAuth) {
        router.push("/");
      }
    }
  }, [isAuth, router]);

  if (loading) {
    return <FullScreenLoader label="Carregando seu perfil" />;
  }

  if (!isAuth) {
    return null;
  }

  return (
    <div className=" flex justify-center items-center w-full flex-col gap-8">
      <div className=" w-64 flex justify-start">

        <button onClick={() => router.push('/')} className="bg-gray-600 p-2 rounded-full">
          <MdOutlineKeyboardArrowLeft size={20} />
        </button>
      </div>

      <button
        className=" flex justify-between items-center w-64"
        onClick={() => {
          localStorage.removeItem("userToken");
          router.push("/");
        }}
      >
        <h3>Minha conta</h3>
        <MdKeyboardArrowRight />
      </button>
      <button
        className=" flex justify-between items-center w-64"
        onClick={() => {
          localStorage.removeItem("userToken");
          router.push("/");
        }}
      >
        <h3>Política de privacidade</h3>
        <MdKeyboardArrowRight />
      </button>

      <button
        className=" flex justify-between items-center w-64"
        onClick={() => {
          localStorage.removeItem("userToken");
          router.push("/");
        }}
      >
        <h3>Termos e condições</h3>
        <MdKeyboardArrowRight />
      </button>
      <button
        className=" flex justify-between items-center w-64"
        onClick={() => {
          localStorage.removeItem("userToken");
          router.push("/");
        }}
      >
        <h3>Falar com o suporte</h3>
        <MdKeyboardArrowRight />
      </button>
      <button
        className="text-center bg-red-500 w-64 p-3 rounded-lg"
        onClick={() => {
          localStorage.removeItem("userToken");
          document.cookie =
          "userToken=; path=/; domain=.livrosgratuitos.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict";
          router.push("/");
        }}
      >
        Sair da conta
      </button>
    </div>
  );
};

export default AccountPage;
