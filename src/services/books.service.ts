import { urlApi } from "@/utils/url";
import { getUserIdFromToken } from "@/hooks/getUserIdFromToken";

async function getAuth() {
  const token = localStorage.getItem("userToken");
  const userId = token ? await getUserIdFromToken() : null;
  return { token, userId };
}

function authHeaders(token: string | null) {
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

export const booksService = {
  async getPublicBooks(params: Record<string, string> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${urlApi}/livros/public${queryString ? `?${queryString}` : ""}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Http error: ${res.status}`);
    return res.json();
  },

  async getBooksWithPdf() {
    const res = await fetch(`${urlApi}/livros/public/pdfs`);
    if (!res.ok) throw new Error(`Http error: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [data];
  },

  async getBookById(id: string) {
    const { token, userId } = await getAuth();
    const url = token
      ? `${urlApi}/livros/${id}/${userId}`
      : `${urlApi}/livros/public/${id}`;

    const res = await fetch(url, { headers: authHeaders(token) });
    if (!res.ok) throw new Error(`Http error: ${res.status}`);
    return res.json();
  },

  async getBookBySlug(slug: string) {
    const { token, userId } = await getAuth();
    const url = token
      ? `${urlApi}/livros/content/${slug}/${userId}`
      : `${urlApi}/livros/public/content/${slug}`;

    const res = await fetch(url, { headers: authHeaders(token) });
    if (!res.ok) throw new Error(`Http error: ${res.status}`);
    return res.json();
  },
};