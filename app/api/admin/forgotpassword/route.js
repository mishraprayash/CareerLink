import Admin from "@/models/Admin";
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { username, email } = await request.json();
        if (!username && !email) {
            return NextResponse.json({ msg: "Username or email missing" }, { status: 400 });
        }
        const adminExist = await Admin.findOne({ username: username, email: email });
        if (!adminExist) {
            return NextResponse.json({ msg: "Admin Not Found" }, { status: 400 });
        }
        const emailResponse = adminExist.verifyEmail();
        console.log("From API", emailResponse.messageId);
        return NextResponse.json({ msg: "Verification Link Sent Successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" });
    }
}