import { useState, useEffect } from "react";
import { getUserIdFromToken } from "./getUserIdFromToken";
import { urlApi } from "@/utils/url";

const useFetchReadingList = () => {
  const [epubReadingList, setEpubReadingList] = useState<IBooks[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReadingList = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("userToken");
      const userId = await getUserIdFromToken();

      const res = await fetch(`${urlApi}/reading-progress/${userId}/epub-reading-list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setEpubReadingList(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReadingList();
  }, []);

  return { epubReadingList, isLoading, error };
};

export default useFetchReadingList;