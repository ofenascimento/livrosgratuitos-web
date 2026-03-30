import { urlApi } from "@/utils/url";
import { useEffect, useState } from "react";

export const useFetchBooksPDF = () => {
    const [books, setBooks] = useState<IBooks[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchBookBySlug = async () => {
        setIsLoading(true);
        try {
            const url = `${urlApi}/livros/public/pdfs`
            console.log(url)
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Http error: ${response.status}`);
            }
            const data = await response.json();
            setBooks(Array.isArray(data) ? data : [data]);
        } catch (error) {
            setError(
                error instanceof Error ? error : new Error("Failed to fetch book")
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookBySlug();
    }, []);

    return { books, isLoading, error };
};
