"use client";
import BookCatalog from "@/components/BookCatalog/BookCatalog";
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
      <BookCatalog categoria={search} />
    </>
  );
}

export default CategoriaPage;
