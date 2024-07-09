import { useState, useEffect } from "react";
import { getUserIdFromToken } from "./getUserIdFromToken";
import { urlApi } from "@/utils/url";

const useFetchFavoriteBooks = (refreshKey = 0) => {
  const [favoriteBooks, setFavoriteBooks] = useState<IBooks[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFavoriteBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await localStorage.getItem("userToken");
      const userId = await getUserIdFromToken();
      const url = `${urlApi}/users/${userId}/favorite-books`;
      console.log(urlApi)
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFavoriteBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteBooks();
  }, []);

  return { favoriteBooks, isLoading, error };
};

export default useFetchFavoriteBooks;
