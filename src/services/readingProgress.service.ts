import { urlApi } from "@/utils/url";
import { getUserIdFromToken } from "@/hooks/getUserIdFromToken";

export const readingProgressService = {
  async getEpubReadingList() {
    const token = localStorage.getItem("userToken");
    const userId = await getUserIdFromToken();

    const response = await fetch(`${urlApi}/reading-progress/${userId}/epub-reading-list`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  },

  async getProgress(livroId: string) {
    const token = localStorage.getItem("userToken");

    const response = await fetch(`${urlApi}/reading-progress/${livroId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  },

  async saveProgress(livroId: string, progressPercentage: number, currentCfi?: string) {
    const token = localStorage.getItem("userToken");

    const response = await fetch(`${urlApi}/reading-progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ livroId, progressPercentage, currentCfi }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  },
};