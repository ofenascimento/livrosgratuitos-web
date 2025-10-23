// hooks/addEpubProgress.ts
import { urlApi } from "@/utils/url";
import { getUserIdFromToken } from "./getUserIdFromToken";

export async function addEpubProgress(
  bookId: string,
  progress: number,     
  cfi?: string,          
  callback?: () => void
) {
  try {
    const token = localStorage.getItem("userToken");
    const userId = await getUserIdFromToken();
    const url = `${urlApi}/users/${userId}/epub-progress`;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ bookId, progress, cfi }),
      keepalive: true, 
    });

    if (!resp.ok) {
      throw new Error(`Erro HTTP: ${resp.status}`);
    }

    if (callback) callback();
  } catch (err) {
    console.error("Falha ao salvar EPUB progress:", err);
  }
}
