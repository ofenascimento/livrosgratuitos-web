"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchBook } from "@/hooks/useFetchBook";

function Livros() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");
  const { book } = useFetchBook(bookId ?? "");

  useEffect(() => {
    if (book?.slug) {
      router.replace(`/livro/${book.slug}`);
    }
  }, [book, router]);

  return null;
}

export default Livros;