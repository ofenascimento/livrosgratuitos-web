import { urlApi } from "@/utils/url";
import { getUserIdFromToken } from "./getUserIdFromToken";

export async function addProgressBook(
  bookId: string,
  progress: number,
  progressPercentage: number,
  currentParagraph: number,
  callback?: () => void
) {
  try {
    const token = await localStorage.getItem("userToken");
    const userId = await getUserIdFromToken();
    const url = `${urlApi}/users/${userId}/save-progress`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookId: bookId,
        progress: progress,
        progressPercentage: progressPercentage,
        currentParagraph: currentParagraph
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    if (callback) {
      callback();
    }
  } catch (error) {
    console.error("Falha na requisição:", error);
  }
}
