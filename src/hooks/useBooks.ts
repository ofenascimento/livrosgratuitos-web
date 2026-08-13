import { useQuery } from "@tanstack/react-query";
import { booksService } from "@/services/books.service";

export function useBooksList(params: Record<string, string> = {}) {
  const { data, isLoading, error } = useQuery<IBooks[]>({
    queryKey: ["books", params],
    queryFn: () => booksService.getPublicBooks(params),
  });

  return { books: data ?? [], isLoading, error };
}

export function useBooksPDF() {
  const { data, isLoading, error } = useQuery<IBooks[]>({
    queryKey: ["booksWithPdf"],
    queryFn: () => booksService.getBooksWithPdf(),
  });

  return { books: data ?? [], isLoading, error };
}

export function useBookById(id: string) {
  const { data, isLoading, error } = useQuery<IBook>({
    queryKey: ["book", id],
    queryFn: () => booksService.getBookById(id),
    enabled: !!id,
  });

  return { book: data, isLoading, error };
}

export function useBookBySlug(slug: string) {
  const { data, isLoading, error } = useQuery<IBook>({
    queryKey: ["bookBySlug", slug],
    queryFn: () => booksService.getBookBySlug(slug),
    enabled: !!slug,
  });

  return { book: data, isLoading, error };
}