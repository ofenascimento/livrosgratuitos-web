import { urlApi } from "@/utils/url";
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "./getUserIdFromToken";

export const useFetchBookBySlug = (slug: string) => {
  const [book, setBook] = useState<IBook | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBookBySlug = async () => {
    setIsLoading(true);
    try {
      const token = await localStorage.getItem("userToken");
      const userId = await getUserIdFromToken();
      const url = token ? `${urlApi}/livros/content/${slug}/${userId}` : `${urlApi}/livros/public/content/${slug}`
      console.log(url)
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Http error: ${response.status}`);
      }
      const data = await response.json();
      setBook(data);
      console.log(data)
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Failed to fetch book")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookBySlug();
  }, [slug]);

  return { book, isLoading, error };
};
