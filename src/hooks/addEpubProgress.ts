import { urlApi } from "@/utils/url";

export const addEpubProgress = async (
  livroId: string,
  progressPercentage: number,
  currentCfi?: string
) => {
  try {
    const token = localStorage.getItem("userToken");

    console.log("addEpubProgress chamou");

    const res = await fetch(`${urlApi}/reading-progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        livroId,
        progressPercentage,
        currentCfi,
      }),
    });

    console.log("status", res.status);
  } catch (e) {
    console.error("Erro ao salvar progresso", e);
  }
};