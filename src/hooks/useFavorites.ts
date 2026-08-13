import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/services/favorites.service";

export function useAddFavoriteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => favoritesService.add(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

export function useRemoveFavoriteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => favoritesService.remove(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}