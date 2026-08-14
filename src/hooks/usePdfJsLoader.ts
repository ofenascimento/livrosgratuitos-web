import { useEffect, useState } from "react";

const PDFJS_VERSION = "3.11.174";
const WORKER_SRC = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;
const PDFJS_SRC = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;

export function usePdfJsLoader() {
  const [pdfReady, setPdfReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.pdfjsLib) {
      setPdfReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = PDFJS_SRC;
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_SRC;
      setPdfReady(true);
    };
    script.onerror = () => setError("Falha ao carregar PDF.js.");
    document.head.appendChild(script);
  }, []);

  return { pdfReady, error };
}