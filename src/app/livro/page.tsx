"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookById } from "@/hooks/useBooks";

function Livros() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");
  const { book } = useBookById(bookId ?? "");

  useEffect(() => {
    if (book?.slug) {
      router.replace(`/livro/${book.slug}`);
    }
  }, [book, router]);

  return null;
}

export default Livros;