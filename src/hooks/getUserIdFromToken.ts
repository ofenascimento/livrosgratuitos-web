export async function getUserIdFromToken() {
    // Verifica se o código está sendo executado no lado do cliente
    if (typeof window !== "undefined") {
        const token = localStorage.getItem('userToken');
        if (token) {
            const parts = token.split('.');
            if (parts.length === 3) {
                try {
                    // Decodifica a parte do payload do token que está em base64
                    let decodedPayloadBase64 = atob(parts[1]);
                    
                    decodedPayloadBase64 = decodedPayloadBase64.trim(); 
                    decodedPayloadBase64 = decodedPayloadBase64.replace(/[\n\r]+/g, ''); 

                    // Encontrar o último colchete de fechamento para garantir que o JSON está bem formado
                    const lastCurlyBrace = decodedPayloadBase64.lastIndexOf('}');
                    if (lastCurlyBrace !== -1) {
                        decodedPayloadBase64 = decodedPayloadBase64.substring(0, lastCurlyBrace + 1);
                    }

                    // Fazer o parse do payload decodificado
                    const decodedPayload = JSON.parse(decodedPayloadBase64);
                    
                    // Retornar o ID do usuário
                    return decodedPayload._id;
                } catch (error) {
                    console.error("Erro ao decodificar ou fazer o parse do payload do token:", error);
                    return null;
                }
            }
        }
    }
    return null;
}
