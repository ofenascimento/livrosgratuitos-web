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
  progressPercentage?: number;
  _id: string;
}

const useFetchReadingList = () => {
  const [readingList, setReadingList] = useState<IBooks[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReadingList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await localStorage.getItem("userToken");
      const userId = await getUserIdFromToken();
      const url = `${urlApi}/users/${userId}/reading-list`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReadingList(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReadingList();
  }, []);

  return { readingList, isLoading, error };
};

export default useFetchReadingList;
