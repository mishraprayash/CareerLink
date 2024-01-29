


import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import connectDB from "@/config/dbconfig/database";
import { handleVerificationLink } from "@/helpers/emailhandlers/(logged-in)/handleVerificationLink";
import { decodeJWTAdmin } from "@/helpers/validateToken";
// import Company from "@/models/Company";

export async function GET(request) {
    try {
        await connectDB();
        // grabbing the token from the cookies
        const decodedToken = await decodeJWTAdmin(request);
        // returing the response as returned by this function
        return handleVerificationLink(Admin, decodedToken);

    } catch (error) {

        console.log("Error occured while sending verification Link", error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}