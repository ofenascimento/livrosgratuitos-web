"use client";
import BookCatalog from "@/components/BookCatalog/BookCatalog";
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
    <>
      <Navbar />
      <BookCatalog titulo={search} />
    </>
  );
}

export default BuscarPage;
