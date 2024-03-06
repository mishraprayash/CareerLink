import { NextResponse } from "next/server";
import Company from "@/models/Company";
import connectDB from "@/config/dbconfig/database";
import { handleEmailVerification } from "@/helpers/emailhandlers/(logged-out)/handleEmailVerification";

// when company wants to verify they will get routed to the
// https://domain.com/api/company/verifyemail

// this token is hashed db id of a user which we get from the cookies.

export async function POST(request) {
    try {
        await connectDB();
        return handleEmailVerification(request, Company);
    } catch (error) {
        console.log("Error during email verification", error);
        return NextResponse.json({ error: error.message, }, { status: 500 });
    }
}