
import jwt from "jsonwebtoken"
export async function decodeJWTCompany(request) {
    try {
        const token = request.cookies.get('token') || "";
        if (!token) {
            return false;
        }
        const { JWT_SECRET_COMPANY } = process.env;
        const decodedToken = jwt.verify(token, JWT_SECRET_COMPANY);
        if(!decodedToken){
            return false;
        }
        return decodedToken;
    } catch (error) {
        throw new Error(error.message);
    }
}