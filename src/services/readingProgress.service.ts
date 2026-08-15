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