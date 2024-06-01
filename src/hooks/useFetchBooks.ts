import { useEffect, useState } from "react";

interface Params {
  [key: string]: string;
}

interface IBooks {
    capa: string;
    titulo: string;
    autor: string;
    txt: string;
    pdf?: string;
    epub?: string;
    _id: string;
}


const useFetchBooks = (params: Params) => {
  const [books, setBooks] = useState<IBooks[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<Error | null>(null);

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const queryString = Object.keys(params)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join("&");
      const url = `https://fluted-alloy-416520.rj.r.appspot.com/livros/public${
        queryString ? `?${queryString}` : ""
      }`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Http error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setBooks(data);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Failed to fetch books")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [JSON.stringify(params)]);

  return { books, isLoading, error };
};

export default useFetchBooks;
