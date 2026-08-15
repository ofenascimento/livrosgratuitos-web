"use client";
import AdBanner from "@/components/ADS/AdBanner";
import AdBannerMobile from "@/components/ADS/AdsBannerMobile";
import Card from "@/components/Card/Card";
import CustomLayout from "@/components/CustomLayout/CustomLayout";
import Footer from "@/components/Footer/Footer";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import Navbar from "@/components/Navbar/Navbar";
import Title from "@/components/Title/Title";
import useAuth from "@/hooks/useAuth";
import { useEpubReadingList } from "@/hooks/useReadingProgress";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function FavoritosPage() {
  const isAuth = useAuth();
  const { data: epubReadingList = [], isLoading } = useEpubReadingList();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (epubReadingList.length > 0 && !isLoading) {
      const imagePromises = epubReadingList.map((book: IBooks) =>
        new Promise((resolve) => {
          const img = new window.Image();
          img.src = book.cover;
          img.onload = resolve;
          img.onerror = resolve;
        })
      );
      Promise.all(imagePromises).then(() => setImagesLoaded(true));
    } else if (!isLoading) {
      setImagesLoaded(true);
    }
  }, [epubReadingList, isLoading]);

  if (!isAuth) {
    return (
      <CustomLayout>
        <Navbar />
        <AdBanner
          dataAdFormat=""
          dataFullWidthResponsive={false}
          dataAdSlot="2423907456"
          customClassName="mt-4"
        />
        <AdBannerMobile dataAdSlot="6603126932" customClassName="mt-3" />
        <div className="flex items-center mt-2 justify-center">
          <div className="max-w-md w-full p-4 rounded-lg flex justify-center items-center flex-col gap-2">
            <h2 className="text-4xl font-bold text-center m-0 text-white">
              Salve seu progresso
            </h2>
            <p className="text-white text-center">
              Faça login ou crie uma conta para salvar seu progresso de leitura
            </p>
            <Image
              src="/favorites-ilustration.webp"
              className="rounded-3xl mb-2"
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
      </CustomLayout>
    );
  }

  if (isLoading || !imagesLoaded) {
    return <FullScreenLoader label="Carregando seus livros em progresso" />;
  }

  if (epubReadingList.length === 0) {
    return (
      <CustomLayout>
        <Navbar />
        <AdBanner
          dataAdFormat=""
          dataFullWidthResponsive={false}
          dataAdSlot="2423907456"
          customClassName="mt-4"
        />
        <AdBannerMobile dataAdSlot="6603126932" customClassName="mt-3" />
        <div className="flex justify-center items-center w-full flex-col">
          <Title
            customClassName="items-start mt-4"
            title={<>Nenhum livro em progresso por enquanto</>}
          />
          <Image
            src="/no-book.webp"
            className="rounded-3xl mb-2"
            width={300}
            height={50}
            alt=""
          />
        </div>
        <Footer />
      </CustomLayout>
    );
  }

  return (
    <CustomLayout>
      <Navbar />
      <AdBanner
        dataAdFormat=""
        dataFullWidthResponsive={false}
        dataAdSlot="2423907456"
        customClassName="mt-4"
      />
      <AdBannerMobile dataAdSlot="6603126932" customClassName="mt-3" />
      <Title
        customClassName="items-start mt-2"
        title={
          <>
            Seus livros{"  "}
            <span
              style={{
                background: "linear-gradient(90deg,#6e48ff 0,#cf40ff 48%,#ffa22c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              em progresso
            </span>
          </>
        }
      />
      <div className="w-full flex flex-wrap gap-4 items-center justify-center mt-2">
        {epubReadingList.map((item: IBooks, index: number) => (
          <Card
            key={index}
            id={item._id}
            capa={item.cover}
            titulo={item.title}
            progress={item.progressPercentage}
            slug={item.slug}
          />
        ))}
      </div>
      <Footer />
    </CustomLayout>
  );
}

export default FavoritosPage;