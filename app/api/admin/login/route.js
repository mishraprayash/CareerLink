import connectDB from "@/config/database";
import Admin from "@/models/admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        await connectDB();
        const { username, password } = await request.json();
        if (!username || !password) {
            return NextResponse.json({ msg: "Invalid Credentials" });
        }
        const adminExist = await Admin.findOne({
            username: username
        })
        if (!adminExist) {
            return NextResponse.json({ msg: "Invalid Creddentials" })
        }
        // checking if password is macthed.
        const isPasswordMatched = await bcrypt.compare(password, adminExist.password);

        if (!isPasswordMatched) {
            return NextResponse.json({ msg: "Invalid Creddentials" });
        }
        const tokenData = {
            id: adminExist._id,
            username,
            email: adminExist.email
        };

        const { JWT_SECRET } = process.env;
        const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: '7d' });

        const response = NextResponse.json({ msg: "Successful Login", success: true, token: token }, { status: 200});

        // setting jwt token in cookies
        response.cookies.set("token", token, { httpOnly: true });
        return response;

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Error, check server for error logs" });
    }
}