import { urlApi } from "@/utils/url";

export const getEpubProgress = async (bookId: string) => {
  try {
    const token = localStorage.getItem("userToken");

    const res = await fetch(`${urlApi}/reading-progress/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return null;

    const data = await res.json();

    return {
      cfi: data?.currentCfi,
      percentage: data?.progressPercentage,
    };
  } catch {
    return null;
  }
};