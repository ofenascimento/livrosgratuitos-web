"use client";
import AdBanner from "@/components/ADS/AdBanner";
import Card from "@/components/Card/Card";
import Footer from "@/components/Footer/Footer";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import Navbar from "@/components/Navbar/Navbar";
import LivroPageSkeleton from "@/components/Skeleton/LivroPageSkeleton";
import TabBar from "@/components/TabBar/TabBar";
import Title from "@/components/Title/Title";
import useAuth from "@/hooks/useAuth";
import useFetchFavoriteBooks from "@/hooks/useFetchFavoriteBooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function FavoritosPage() {
  const isAuth = useAuth();
  const router = useRouter();

  const { favoriteBooks, isLoading } = useFetchFavoriteBooks();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (favoriteBooks.length > 0 && !isLoading) {
      const imagePromises = favoriteBooks.map((book) => {
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
  }, [favoriteBooks, isLoading]);

  if (isLoading) {
    return <FullScreenLoader label="Carregando seus livros favoritos" />;
  }

  if (!isAuth)
    return (
      <>
        <Navbar />
        <div className="flex items-center mt-2 justify-center">
          <div className="max-w-md w-full p-4 rounded-lg flex justify-center items-center flex-col gap-2">
            <h2 className="text-4xl font-bold text-center m-0 text-white">
              Favorite seus livros
            </h2>
            <p className=" text-white text-center">
              Faça login ou crie uma conta para favoritar seus livros
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

  if (favoriteBooks === null || favoriteBooks.length === 0) {
    return (
      <div>
        <Navbar />
        <div className=" flex justify-center items-center w-full flex-col">
          <Title
            customClassName="items-start mt-4"
            title={<>Nenhum livro favoritado por enquanto</>}
          />
          <Image
            src="/no-books.webp"
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
              favoritos
            </span>{" "}
          </>
        }
      />
      <AdBanner
        dataAdFormat=""
        dataFullWidthResponsive={false}
        dataAdSlot="2423907456"
      />
      <div className="w-full flex flex-wrap gap-4 items-center justify-center mt-2">
        {favoriteBooks.map((item, index) => (
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
