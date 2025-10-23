import { urlApi } from "@/utils/url";
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "./getUserIdFromToken";

export const useFetchBook = (id: string) => {
  const [book, setBook] = useState<IBook | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBook = async () => {
    setIsLoading(true);
    try {
      const token = await localStorage.getItem("userToken");
      const userId = await getUserIdFromToken();
      const url = token ? `${urlApi}/livros/${id}/${userId}` : `${urlApi}/livros/public/${id}`
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Http error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
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
