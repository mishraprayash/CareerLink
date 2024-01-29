import connectDB from "@/config/dbconfig/database";
import Company from "@/models/Company";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');
        const { password, confirmPassword } = await request.json();
        if (!confirmPassword || !token || !password) {
            return NextResponse.json({ msg: "Invalid Credentials" }, { status: 400 });
        }
        if (password !== confirmPassword) {
            return NextResponse.json({ msg: "Password and ConfirmPassword doesnot match" }, { status: 400 });
        }
        const company = await Company.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiration: { $gt: Date.now() }
        });
        if (!company) {
            return NextResponse.json({ msg: "Invalid Token or Token expired" }, { status: 400 });
        }
        company.password = await bcrypt.hash(confirmPassword, 10);
        company.resetPasswordToken = undefined;
        company.resetPasswordTokenExpiration = undefined;
        await company.save();
        return NextResponse.json({ msg: "Password Changed Successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}