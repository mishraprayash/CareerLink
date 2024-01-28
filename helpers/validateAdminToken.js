
import jwt from "jsonwebtoken"
export async function decodeJWTAdmin(request, Model) {
    try {
        const token = request.cookies.get('token') || "";
        if (!token) {
            return false;
        }
        const { JWT_SECRET_ADMIN } = process.env;
        const decodedToken = jwt.verify(token.value, JWT_SECRET_ADMIN);
        if (!decodedToken) {
            return false;
        }
        return decodedToken;

    } catch (error) {
        throw new Error(error.message);
    }
}