import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const { username, email, password } = body;
        console.log(username, email, password);
    
        const user = await Admin.findOne({
            $or: [{ email: email }, { username: username }]
        });
        if (user) {
            return NextResponse.json({
                msg: 'Email or username already used'
            }, { status: 400 })
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const savedAdmin = await Admin.create({
            username,
            email,
            password:hashedPassword
        });
        if (!savedAdmin) {
            return NextResponse.json({
                msg: "Error saving details"
            }, { status: 400 });
        }
        return NextResponse.json({
            msg: "Admin Applied for registration"
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            msg: "Error occured during registration"
        }, {
            status: 400
        })
    }
}