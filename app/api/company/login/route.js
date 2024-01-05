import connectDB from "@/config/database";
import Company from "@/models/Company";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        await connectDB();
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ msg: "Invalid Credentials" });
        }
        const companyExist = await Company.findOne({
            email: email
        })
        if (!companyExist) {
            return NextResponse.json({ msg: "Invalid Creddentials" })
        }
        // checking if password is macthed.
        const isPasswordMatched = await bcrypt.compare(password, companyExist.password);

        if (!isPasswordMatched) {
            return NextResponse.json({ msg: "Invalid Creddentials" });
        }
       
        const token = Company.createJWT();
        const response = NextResponse.json({ msg: "Successful Login", success: true}, { status: 200});

        // setting jwt token in cookies
        response.cookies.set("token", token, { httpOnly: true });
        return response;

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Error, check server for error logs" });
    }
}