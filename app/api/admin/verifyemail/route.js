import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import connectDB from "@/config/database";

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token')
        if (!token) {
            return NextResponse.json({ msg: "No Token" }, { status: 400 });
        }
        const admin = await Admin.findOne({
            verifyToken: token,
            verifyTokenExpiration: { $gt: Date.now() },
        });
        if (!admin) {
            return NextResponse.json({ msg: "Invalid token", success: false }, { status: 400 });
        }
        admin.verified = true;
        admin.verifyToken = undefined;
        admin.verifyTokenExpiration = undefined;
        await admin.save();
        return NextResponse.redirect('/',request.nextUrl);
    } catch (error) {
        return NextResponse.json({ error: error.message, }, { status: 500 });
    }
}
