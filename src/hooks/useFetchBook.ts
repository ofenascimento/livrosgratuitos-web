import { urlApi } from "@/utils/url";
import { useEffect, useState } from "react";

export const useFetchBook = (id: string) => {
  const [book, setBook] = useState<IBook | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBook = async () => {
    console.log('sem auth')
    setIsLoading(true);
    try {
      const url =
        `${urlApi}/livros/public/${id}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Http error: ${response.status}`);
      }
      const data = await response.json();
      setBook(data);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Failed to fetch book")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  return { book, isLoading, error };
};
