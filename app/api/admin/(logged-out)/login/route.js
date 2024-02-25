import connectDB from "@/config/dbconfig/database";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        await connectDB();
        const { username, password } = await request.json();
        console.log(username,password)
        if (!username || !password) {
            return NextResponse.json({ msg: "Invalid Credentials" }, { status: 400 });
        }
        const adminExist = await Admin.findOne({ $and: [{ username: username }, { state: "Approved" }] });
        if (!adminExist) {
            return NextResponse.json({ msg: "Admin Doesnot Exist" }, { status: 400 });
        }
        // checking if password is macthed.
        const isPasswordMatched = await bcrypt.compare(password, adminExist.password);
        // console.log(isPasswordMatched)
        if (!isPasswordMatched) {
            return NextResponse.json({ msg: "Invalid Login Creddentials" }, { status: 400 });
        }
        // creating a JWT 
        const token  = await adminExist.createJWT()
        console.log(token);
        const response = NextResponse.json({ msg: "Successful Login", success: true, token: token }, { status: 200 });

        // setting jwt token in cookies and sending in response object
        response.cookies.set("token", token, { httpOnly: true, secure: true });
        response.cookies.set("admin", "12ffhhforjbjbbbjbadminjbjjgyjgyulogin",);
        return response;

    } catch (error) {
        if(error instanceof SyntaxError){
            return NextResponse.json({msg:"Invlaid JSON in the request body"});
        }
        console.log(error);
        return NextResponse.json({ msg: "Error, check server for error logs" }, { status: 500 });
    }
}