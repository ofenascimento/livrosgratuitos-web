import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/services/favorites.service";

export function useFavoriteBooksList() {
  const { data, isLoading, error } = useQuery<IBooks[]>({
    queryKey: ["favoriteBooks"],
    queryFn: () => favoritesService.getAll(),
  });

  return { favoriteBooks: data ?? [], isLoading, error };
}

export function useAddFavoriteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => favoritesService.add(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteBooks"] });
    },
  });
}

export function useRemoveFavoriteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => favoritesService.remove(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteBooks"] });
    },
  });
}