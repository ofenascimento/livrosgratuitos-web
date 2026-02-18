import useSWR from "swr";
import { urlApi } from "@/utils/url";

interface Params {
  [key: string]: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Http error: ${res.status}`);
  return res.json();
};

export default function useFetchBooks(params: Params) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${urlApi}/livros/public${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading } = useSWR(url, fetcher, {
    dedupingInterval: 60_000,   
    revalidateOnFocus: false,  
    keepPreviousData: true,   
  });

  return { books: data ?? [], isLoading, error };
}