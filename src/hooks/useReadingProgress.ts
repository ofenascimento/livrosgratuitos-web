import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { readingProgressService } from "@/services/readingProgress.service";

export function useEpubReadingList() {
  return useQuery({
    queryKey: ["epubReadingList"],
    queryFn: () => readingProgressService.getEpubReadingList(),
  });
}

export function useSaveProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookId,
      progressPercentage,
      currentCfi,
    }: {
      bookId: string;
      progressPercentage: number;
      currentCfi?: string;
    }) => readingProgressService.saveProgress(bookId, progressPercentage, currentCfi),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["readingProgress", variables.bookId] });
      queryClient.invalidateQueries({ queryKey: ["epubReadingList"] });
    },
  });
}