

import { NextResponse } from "next/server";
import connectDB from "@/config/dbconfig/database";
import { handleVerificationLink } from "@/helpers/emailhandlers/(logged-in)/handleVerificationLink";
import { decodeJWTCompany } from "@/helpers/validateToken";
import Company from "@/models/Company";

export async function GET(request) {
    try {
        // connecting to a DB
        await connectDB();

        // grabbing cookies and extracting user information
        const decodedToken = await decodeJWTCompany(request);

        // returning the response given by function
        return handleVerificationLink(Company, decodedToken);

    } catch (error) {

        console.log("Error occured while sending verification Link", error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}