
import jwt from "jsonwebtoken"

export async function decodeJWT(request) {
    try {
        const token = request.cookies.get('token') || "";
        if (!token) {
            throw new Error("Error occured during token decryption");
        }
        const { JWT_SECRET } = process.env;
        const decodedToken = jwt.verify(token, JWT_SECRET);
        return decodedToken;

    } catch (error) {
        throw new Error(error.message);
    }
}