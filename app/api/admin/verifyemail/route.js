import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import connectDB from "@/config/database";
import { handleEmailVerification } from "@/helpers/handleEmailVerification";

// when company wants to verify they will get routed to the
// https://domain.com/api/company/verifyemail
// this token is hashed db id of a user which we get from the cookies.

export async function GET(request) {
    try {
        await connectDB();
        return handleEmailVerification(request, Admin);
    } catch (error) {
        console.log("Error during email verification", error);
        return NextResponse.json({ error: error.message, }, { status: 500 });
    }
}
