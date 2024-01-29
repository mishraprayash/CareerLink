import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import { emailQueue } from "@/config/redisconfig/redis-bullmq";

export async function POST(request) {
    try {
        await connectDB();
        const { username, email } = await request.json();
        if (!username ||  !email) {
            return NextResponse.json({ msg: "Username or email missing" }, { status: 400 });
        }
        // checking if the user is valid or not.
        const adminExist = await Admin.findOne({ username: username, email: email, state: "Approved", verified: true });
        if (!adminExist) {
            return NextResponse.json({ msg: "Admin Not Verified or Invalid Credentials" }, { status: 400 });
        }
        // handling reset password
        await handleResetPassword(adminExist);
        
        return NextResponse.json({ msg: "ResetPassword Link Sent Successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" });
    }
}

// function for sending a email link to reset password
async function handleResetPassword(admin) {
    try {
        await admin.resetPassword();
        console.log(`Password Reset Email Link Sent for ${admin.username} at ${new Date()}`);
    } catch (error) {
        console.log("Admin verification link could not be send.");
        return NextResponse.json({ msg: "Error in Sending Reset Password Link" }, { status: 404 });
    }
}