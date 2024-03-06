import connectDB from "@/config/dbconfig/database";
import Company from "@/models/Company";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'


export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json()
        const { email, companyName, password, confirmPassword } = body
        console.log(email)

        if (password != confirmPassword) {
            return NextResponse.json({ "message": "password !=confirm password" })
        }
        const companyExist = await Company.findOne({ email: email });
        if (companyExist) {
            return NextResponse.json(
                { msg: 'Email  already used' },
                { status: 400 }
            );
        };
        const hashedPassword = await bcrypt.hash(password, 10)
        const company = await Company.create({ email, password: hashedPassword, companyName })
        if (!company) {
            return NextResponse.json(
                { msg: "Error saving details" },
                { status: 400 }
            );
        }
        await sendVerificationEmail(company);

        return NextResponse.json(
            { msg: "Company Applied for registration and verification link has been sent to the email" },
            { status: 201 }
        );

    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal Server Error", error: error }, { status: 500 })
    }
}

async function sendVerificationEmail(company){
    try{
        await company.verifyEmail();
        console.log(`Verification Email Link Queued for ${company.companyName} at ${new Date()}}`);
    }catch(error){
        console.log("Company verification link couldnot be send");
        console.log(error);
    }
}