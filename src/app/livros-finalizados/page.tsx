"use client";
import Card from "@/components/Card/Card";
import Footer from "@/components/Footer/Footer";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import Navbar from "@/components/Navbar/Navbar";
import LivroPageSkeleton from "@/components/Skeleton/LivroPageSkeleton";
import Title from "@/components/Title/Title";
import useAuth from "@/hooks/useAuth";
import useFetchFavoriteBooks from "@/hooks/useFetchFavoriteBooks";
import useFetchFinishedBooks from "@/hooks/useFetchFinishedBooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function FavoritosPage() {
  const isAuth = useAuth();
  const router = useRouter();

  const { finishedBooks, isLoading } = useFetchFinishedBooks();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (finishedBooks.length > 0 && !isLoading) {
      const imagePromises = finishedBooks.map((book) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = book.capa;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(imagePromises).then(() => {
        setImagesLoaded(true);
      });
    }
  }, [finishedBooks, isLoading]);

  if (!isAuth)
    return (
      <>
        <Navbar />
        <div className="flex items-center mt-2 justify-center">
          <div className="max-w-md w-full p-4 rounded-lg flex justify-center items-center flex-col gap-2">
            <h2 className="text-4xl font-bold text-center m-0 text-white">
              Veja seus livros finalizados
            </h2>
            <p className=" text-white text-center">
              Faça login ou crie uma conta para ver seus livros finalizados
            </p>
            <Image
              src="/favorites-ilustration.webp"
              className=" rounded-3xl mb-2"
              width={300}
              height={50}
              alt=""
            />
            <Link
              href="login"
              className="w-full bg-main-400 text-center text-white py-2 px-4 rounded-full font-medium"
            >
              Fazer login
            </Link>
            <Link
              href="criar-conta"
              className="w-full bg-main-400 text-center text-white py-2 px-4 rounded-full font-medium"
            >
              Criar conta
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );

  if (finishedBooks === null || finishedBooks.length === 0) {
    return (
      <div>
        <Navbar />
        <div className=" flex justify-center items-center w-full flex-col">
          <Title
            customClassName="items-start mt-4"
            title={<>Nenhum livro finalizado por enquanto</>}
          />
          <Image
            src="/no-book.webp"
            className=" rounded-3xl mb-2"
            width={300}
            height={50}
            alt=""
          />
        </div>

        <Footer />
      </div>
    );
  }

  if (isLoading || !imagesLoaded) {
    return <FullScreenLoader label="Carregando seus livros finalizados" />;
  }
  return (
    <div>
      <Navbar />
      <Title
        customClassName="items-start mt-4"
        title={
          <>
            Seus livros{"  "}
            <span
              style={{
                background:
                  "linear-gradient(90deg,#6e48ff 0,#cf40ff 48%,#ffa22c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              finalizados
            </span>{" "}
          </>
        }
      />
      <div className="w-full  flex flex-wrap  gap-8 items-center ml-3 justify-start mt-2">
        {finishedBooks.map((item, index) => (
          <Card
            key={index}
            id={item._id}
            capa={item.capa}
            titulo={item.titulo}
            autor={item.autor}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default FavoritosPage;
