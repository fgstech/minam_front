export default function jwt_decode(token) {

    if(token == null || token == undefined) return null;

    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('El token JWT no es válido. Debe tener tres partes.');
    }

    function base64UrlDecode(base64Url) {
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        const padding = base64.length % 4;
        if (padding === 2) {
            base64 += '==';
        } else if (padding === 3) {
            base64 += '=';
        } else if (padding !== 0) {
            throw new Error('El string Base64 no es válido.');
        }

        const decoded = atob(base64);
        try {
            return JSON.parse(decoded);
        } catch (error) {
            throw new Error('El payload o el header no están en formato JSON válido.');
        }
    }

    const header = base64UrlDecode(parts[0]);
    const payload = base64UrlDecode(parts[1]);
    return payload
}
