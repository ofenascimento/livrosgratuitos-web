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
    <div className="min-h-screen">
      <Navbar />
      <BookCatalog categoria={search} />
      <br />
      <Footer />
    </div>
  );
}

export default CategoriaPage;
