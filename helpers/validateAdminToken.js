import jwt from "jsonwebtoken"
export async function decodeJWTAdmin(request) {
    try {
        const token = request.cookies.get('token');
        // console.log('from cookies',token);
        if (!token) {
            throw new Error("Token Not Available");
        }
        const { JWT_SECRET_ADMIN } = process.env;
        const decodedToken = jwt.verify(token.value, JWT_SECRET_ADMIN);
        return decodedToken;

    } catch (error) {
        throw new Error(error.message);
    }
}