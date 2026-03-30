import { urlApi } from "@/utils/url";
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "./getUserIdFromToken";

export const useFetchBookBySlug = (slug: string) => {
  const [book, setBook] = useState<IBook | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    const fetchBook = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("userToken");
        const userId = token ? await getUserIdFromToken() : null;

        const url = token && userId
          ? `${urlApi}/livros/content/${slug}/${userId}`
          : `${urlApi}/livros/public/content/${slug}`;

        const response = await fetch(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) throw new Error(`Http error: ${response.status}`);

        const data = await response.json();
        if (!cancelled) setBook(data);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err : new Error("Failed to fetch book"));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchBook();

    return () => { cancelled = true; };
  }, [slug]);

  return { book, isLoading, error };
};