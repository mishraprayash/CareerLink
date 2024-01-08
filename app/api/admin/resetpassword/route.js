import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import bcryptjs from "bcryptjs";

export async function POST(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');
        const { password, confirmPassword } = await request.json();
        if (!(token && password && confirmPassword)) {
            return NextResponse.json({ msg: "Not a valid password or token" }, { status: 400 });
        }
        if (password !== confirmPassword) {
            return NextResponse.json({ msg: "Password and ConfirmPassword doesnot match" }, { status: 400 });
        }
        const admin = await Admin.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiration: { $gt: Date.now() },
        });
        if (!admin) {
            return NextResponse.json({ msg: "Invalid Token or Token Expired" }, { status: 400 });
        }
        admin.password = await bcryptjs.hash(confirmPassword, 10);
        admin.forgotPasswordToken = undefined;
        admin.forgotPasswordTokenExpiration = undefined;
        await admin.save();
        return NextResponse.json({ msg: "Password Changed Successfully", }, { status: 200, });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}
