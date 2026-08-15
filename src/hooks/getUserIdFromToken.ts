export async function getUserIdFromToken() {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem('userToken');
        if (token) {
            const parts = token.split('.');
            if (parts.length === 3) {
                try {
                   
                    let decodedPayloadBase64 = atob(parts[1]);
                    
                    decodedPayloadBase64 = decodedPayloadBase64.trim(); 
                    decodedPayloadBase64 = decodedPayloadBase64.replace(/[\n\r]+/g, ''); 

                   
                    const lastCurlyBrace = decodedPayloadBase64.lastIndexOf('}');
                    if (lastCurlyBrace !== -1) {
                        decodedPayloadBase64 = decodedPayloadBase64.substring(0, lastCurlyBrace + 1);
                    }

                   
                    const decodedPayload = JSON.parse(decodedPayloadBase64);
                    
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
