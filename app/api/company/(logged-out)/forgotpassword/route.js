import Company from "@/models/Admin";
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { email } = await request.json();
        if (!email) {
            return NextResponse.json({ msg: "Email missing" }, { status: 400 });
        }
        const companyExist = await Company.findOne({ email: email });
        if (!companyExist) {
            return NextResponse.json({ msg: "Company Not Found" }, { status: 400 });
        }

        //  send a verification link to email to reset password
        await handleVerifyEmail(companyExist)

        return NextResponse.json({ msg: "Verification Link Sent Successfully" }, { status: 200 });

    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({ msg: "Invalid JSON in request body" }, { status: 400 });
        }
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}


async function handleVerifyEmail(company) {
    try {
        await company.verifyEmail();
        console.log(`Password Reset Email Link Sent for ${company.name} at ${new Date()}`);
    } catch (error) {
        console.log(error);
    }
}