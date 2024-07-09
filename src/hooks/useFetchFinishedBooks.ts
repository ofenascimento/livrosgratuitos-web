import { useState, useEffect } from "react";
import { getUserIdFromToken } from "./getUserIdFromToken";
import { urlApi } from "@/utils/url";

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
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
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
