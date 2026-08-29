"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookById } from "@/hooks/useBooks";

function LivrosContent() {
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

function Livros() {
  return (
    <Suspense fallback={null}>
      <LivrosContent />
    </Suspense>
  );
}

export default Livros;