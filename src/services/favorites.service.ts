import { urlApi } from "@/utils/url";
import { getUserIdFromToken } from "@/hooks/getUserIdFromToken";

async function getAuth() {
  const token = localStorage.getItem("userToken");
  const userId = token ? await getUserIdFromToken() : null;
  return { token, userId };
}

export const favoritesService = {
  async add(bookId: string) {
    const { token, userId } = await getAuth();

    const response = await fetch(`${urlApi}/users/${userId}/favorites`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookId }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return response.json();
  },

  async remove(bookId: string) {
    const { token, userId } = await getAuth();

    const response = await fetch(`${urlApi}/users/${userId}/favorites/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return response.json();
  },

  async getAll() {
    const { token, userId } = await getAuth();

    const response = await fetch(`${urlApi}/users/${userId}/favorite-books`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return response.json();
  },
};