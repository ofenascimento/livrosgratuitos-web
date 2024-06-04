import { useEffect, useState } from "react";

interface IBook {
  capa: string;
  titulo: string;
  autor: string;
  txt: string;
  pdf?: string;
  epub?: string;
  _id: string;
  categoria: string[]
  descricao: string;
}

export const useFetchBook = () => {
  const [book, setBook] = useState<IBook | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBook = async () => {
    setIsLoading(true);
    try {
      const url =
        "http://fluted-alloy-416520.rj.r.appspot.com/livros/public/65eeabf7822f5ccbb5d70831";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Http error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
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
  }, []);

  return { book, isLoading, error };
};
