import { urlApi } from "@/utils/url";
import { getUserIdFromToken } from "./getUserIdFromToken";

export async function getEpubProgress(bookId: string) {
    const token = localStorage.getItem("userToken");
    const userId = await getUserIdFromToken();
    const url = `${urlApi}/users/${userId}/epub-progress/${bookId}`;

    console.log(url)


    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });


    if (resp.status === 401 || resp.status === 403) {
        const txt = await resp.text().catch(() => "");
        console.warn("[EPUB][GET] bloqueado por auth:", txt);
        return null;
    }

    if (resp.status === 404) return null;
    if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);

    const json = await resp.json();
    console.log("[EPUB][GET] payload:", json);
    return json?.data ?? null;
}

