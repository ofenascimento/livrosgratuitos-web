"use client";
import BookCatalog from "@/components/BookCatalog/BookCatalog";
import BookList from "@/components/BookList/BookList";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import useAuth from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function CategoriaPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("s") || "";
  const router = useRouter();
  const isAuth = useAuth();

  useEffect(() => {
    if (search === ("" || "undefined")) {
      router.push("/");
    }
  }, [search]);

  return (
    <>
      <Navbar />
      <BookCatalog categoria={search} />
      <br />
      <BookList
        options={{ q: "9", sort: "true" }}
        label={
          <>
            <span
              className="text-white"
              style={{
                textDecorationColor: "#7B66FF",
                textDecorationThickness: "5px",
                textDecorationLine: "underline",
              }}
            >
              Recomendados
            </span>{" "}
            para você ❤️
          </>
        }
      />
      <Footer />
    </>
  );
}

export default CategoriaPage;
