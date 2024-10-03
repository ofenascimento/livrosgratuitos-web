import { urlApi } from "@/utils/url";
import { getUserIdFromToken } from "./getUserIdFromToken";


export async function addFavoriteBook(bookId: string, callback?: () => void ) {

    try {
        const token = await localStorage.getItem("userToken");
        const userId = await getUserIdFromToken();
        const url = `${urlApi}/users/${userId}/favorites`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                "bookId": bookId
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        if(callback) {
            callback()
        }
    } catch (error) {
        console.error('Falha na requisição:', error);
    }
}