import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";
export async function POST(request) {
    try {
        // connecting DB
        await connectDB();
        const { username, email, password } = await request.json();
        const adminExist = await Admin.findOne({ $or: [{ email: email }, { username: username }] });
        if (adminExist) {
            return NextResponse.json(
                { msg: 'Email or username already used' },
                { status: 400 }
            );
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const savedAdmin = await Admin.create({
            username, email, password: hashedPassword
        });
        if (!savedAdmin) {
            return NextResponse.json(
                { msg: "Error saving details" },
                { status: 400 }
            );
        }
        // send a verification link
        const emailResponse = await savedAdmin.verifyEmail();
        console.log("MessageId for emailResponse",emailResponse.messageId);
        return NextResponse.json(
            { msg: "Admin Applied for registration and verification link has been sent to the email" },
            { status: 201 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { msg: "Error occured during registration" },
            { status: 400 }
        );
    }
}
