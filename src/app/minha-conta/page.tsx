"use client";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

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
    <div>
      <button
      className=" w-full text-center"
        onClick={() => {
          localStorage.removeItem("userToken");
          router.push("/");
        }}
      >
        Sair da conta
      </button>
    </div>
  );
};

export default AccountPage;
