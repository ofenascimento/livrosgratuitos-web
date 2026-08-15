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
      livroId,
      progressPercentage,
      currentCfi,
    }: {
      livroId: string;
      progressPercentage: number;
      currentCfi?: string;
    }) => readingProgressService.saveProgress(livroId, progressPercentage, currentCfi),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["readingProgress", variables.livroId] });
      queryClient.invalidateQueries({ queryKey: ["epubReadingList"] });
    },
  });
}