import { urlApi } from "@/utils/url";
import { getUserIdFromToken } from "@/hooks/getUserIdFromToken";

export const readingProgressService = {
  async getEpubReadingList() {
    const token = localStorage.getItem("userToken");
    const userId = await getUserIdFromToken();

    console.log("[DEBUG] getEpubReadingList chamado", { userId, hasToken: !!token });

    const response = await fetch(`${urlApi}/reading-progress/${userId}/epub-reading-list`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("[DEBUG] status da resposta", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log("[DEBUG] dados recebidos", data);

    return data;
  },

  async getProgress(bookId: string) {
    const token = localStorage.getItem("userToken");

    const response = await fetch(`${urlApi}/reading-progress/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  },

  async saveProgress(bookId: string, progressPercentage: number, currentCfi?: string) {
    const token = localStorage.getItem("userToken");

    const response = await fetch(`${urlApi}/reading-progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookId, progressPercentage, currentCfi }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  },
};