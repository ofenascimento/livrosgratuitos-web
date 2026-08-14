import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "@/types/pdfjs";

export function usePdfDocument(pdfUrl: string, ready: boolean) {
  const pdfRef = useRef<PDFDocumentProxy | null>(null);

  const [numPages, setNumPages] = useState(0);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready || !pdfUrl) return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError("");
        setThumbnails([]);
        pdfRef.current = null;

        const pdf = await window.pdfjsLib.getDocument(pdfUrl).promise;
        if (cancelled) return;

        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
        setLoading(false);
        generateThumbnails(pdf, cancelled);
      } catch {
        if (!cancelled) {
          setError("Não foi possível carregar o livro.");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, pdfUrl]);

  const generateThumbnails = async (pdf: PDFDocumentProxy, cancelled: boolean) => {
    const total = pdf.numPages;
    const thumbs = new Array(total).fill("");
    setThumbnails(new Array(total).fill(""));

    const promises = Array.from({ length: total }, async (_, i) => {
      try {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 0.3 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext("2d")!, viewport }).promise;
        thumbs[i] = canvas.toDataURL();
        if (!cancelled) setThumbnails([...thumbs]);
      } catch {
      }
    });

    await Promise.all(promises);
  };

  return { pdf: pdfRef.current, numPages, thumbnails, loading, error };
}