import { useState, useEffect } from "react";
import { getUserIdFromToken } from "./getUserIdFromToken";
import { urlApi } from "@/utils/url";

const useFetchBookAuth = (bookId: string) => {
  const [book, setBook] = useState<IBook | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBook = async () => {
    console.log('com auth')
    setIsLoading(true);
    setError(null);
    try {
      const token = await localStorage.getItem("userToken");
      const userId = await getUserIdFromToken();
      const url = `${urlApi}/livros/${bookId}/${userId}`;
      console.log(url)
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('fetch book auth')
      console.log(data);
      setBook(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  return { book, isLoading, error };
};

export default useFetchBookAuth;
