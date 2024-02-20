import connectDB from "@/config/dbconfig/database";
import Company from "@/models/Company";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


// for login inside the system the company email verification isnot mandatory as they can verify it later after login.
// But the company must have been approved by the admin to access the platform.

export async function POST(request) {
    try {
        await connectDB();
        const { email, password } = await request.json();
        
        if (!email || !password) {
            return NextResponse.json({ msg: "Email or password missing" }, { status: 400 });
        }
        const companyExist = await Company.findOne({ $and: [{ email: email }, { state: "Approved" }] })
        if (!companyExist) {
            return NextResponse.json({ msg: "Company doesnot exist" }, { status: 400 });
        }
        // checking if password is macthed.
        const isPasswordMatched = await bcrypt.compare(password, companyExist.password);

        if (!isPasswordMatched) {
            return NextResponse.json({ msg: "Invalid Creddentials" });
        }

        const token =await companyExist.createJWT();
        const response = NextResponse.json({ msg: "Successful Login" }, { status: 200 });
        // setting jwt token in cookies
        response.cookies.set("token", token, { httpOnly: true, secure: true });
        response.cookies.set("company", "12ffhhfodrjbjbbbjbcomddpaddnyjbjjgyjgyulddogdin",);

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}