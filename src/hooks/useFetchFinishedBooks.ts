import { useState, useEffect } from "react";
import { getUserIdFromToken } from "./getUserIdFromToken";
import { urlApi } from "@/utils/url";

interface IBooks {
  capa: string;
  titulo: string;
  autor: string;
  txt: string;
  pdf?: string;
  epub?: string;
  _id: string;
}

const useFetchFinishedBooks = () => {
  const [finishedBooks, setFinishedBooks] = useState<IBooks[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFinishedBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await localStorage.getItem("userToken");
      const userId = await getUserIdFromToken();
      const url = `${urlApi}/users/${userId}/finished-books`;
      console.log(url);
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setFinishedBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFinishedBooks();
  }, []);

  return { finishedBooks, isLoading, error };
};

export default useFetchFinishedBooks;
