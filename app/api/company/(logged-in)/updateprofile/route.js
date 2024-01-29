import connectDB from "@/config/dbconfig/database";
import { decodeJWTCompany } from "@/helpers/validateToken";
import Company from "@/models/Company";
import { NextResponse } from "next/server"

// this is an api by which the updating of a company profile is handled.
export async function POST(request) {
    try {
        await connectDB();

        const decodedToken = await decodeJWTCompany(request);

        const companyExist = await Company.findById(decodedToken.id);

        if (!companyExist) {
            const response = NextResponse.json({ "msg": "Uauthenticated User" }, { status: 400 });
            response.cookies.set('token', "", { httpOnly: true, expires: new Date(0) })
            return response;
        }

        // here data needs to be accessed and updated in the database


        
        return NextResponse.json({ msg: "Profile Updated Successfully" }, { status: 204 });

    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({ msg: "Invalid JSON in request body" }, { status: 400 });
        }
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}