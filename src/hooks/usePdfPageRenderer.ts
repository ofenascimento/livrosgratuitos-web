import { useCallback, useRef, useState, MutableRefObject } from "react";

export function usePdfPageRenderer(
  pdf: any,
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
) {
  const renderTaskRef = useRef<any>(null);
  const [pageLoading, setPageLoading] = useState(false);

  const renderPage = useCallback(
    async (pageNum: number, scale: number) => {
      if (!pdf || !canvasRef.current) return;
      renderTaskRef.current?.cancel();
      setPageLoading(true);
      try {
        const page = await pdf.getPage(pageNum);

        const dpr = window.devicePixelRatio || 1;
        const viewport = page.getViewport({ scale: scale * dpr });

        const canvas = canvasRef.current;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${viewport.width / dpr}px`;
        canvas.style.height = `${viewport.height / dpr}px`;

        const task = page.render({ canvasContext: canvas.getContext("2d")!, viewport });
        renderTaskRef.current = task;
        await task.promise;
      } catch (e: any) {
        if (e?.name === "RenderingCancelledException") return;
      } finally {
        setPageLoading(false);
      }
    },
    [pdf, canvasRef]
  );

  return { renderPage, pageLoading };
}