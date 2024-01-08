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
        const emailResponse = companyExist.verifyEmail();
        console.log("From API", emailResponse.messageId);
        return NextResponse.json({ msg: "Verification Link Sent Successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" });
    }
}