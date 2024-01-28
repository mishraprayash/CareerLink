


/*
we are using jose library for JWT implementation because NextJS Runtime Edge
doesnot support specific NodeJS APIs for now. jsonwebtoken library uses NodeJS APIs.
 */

import { jwtVerify } from "jose";

export async function decodeJWTAdmin(request) {
    try {
        // here token is an object from where token.value gives the exact jwt
        const token = request.cookies.get('token') || "";
        if (!token) {
            return null;
        }
        const { JWT_SECRET_ADMIN } = process.env;

        // grabbing the payload after verification of token
        const { payload } = await jwtVerify(token.value, new TextEncoder().encode(JWT_SECRET_ADMIN));

        return payload;

    } catch (error) {
        console.log("Error while decoding token", error);
        return null;
    }
}

export async function decodeJWTCompany(request) {
    try {
        const token = request.cookies.get('token') || "";
        if (!token) {
            return null;
        }

        const { JWT_SECRET_COMPANY } = process.env;

        // grabbing the payload after verification of token
        const { payload } = await jwtVerify(token.value, new TextEncoder().encode(JWT_SECRET_COMPANY));

        return payload;
    } catch (error) {
        console.log("Error while decoding Company Token", error);
        return null;
    }
}