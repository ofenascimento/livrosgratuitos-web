"use client";
import AdBanner from "@/components/ADS/AdBanner";
import BookCatalog from "@/components/BookCatalog/BookCatalog";
import BookList from "@/components/BookList/BookList";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Title from "@/components/Title/Title";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function BuscarPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("s") || "";
  const router = useRouter();

  useEffect(() => {
    if (search === "undefined") {
      router.push("/");
    }
  }, [search]);

  return (
    <div className=" min-h-screen">
      <Navbar />
      <AdBanner
        dataAdFormat=""
        dataFullWidthResponsive={false}
        dataAdSlot="2423907456"
      />
      <BookCatalog titulo={search} />
      <br />
      <Footer />
    </div>
  );
}

export default BuscarPage;
