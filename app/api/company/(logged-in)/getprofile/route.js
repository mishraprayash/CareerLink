
import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import { decodeJWTCompany } from "@/helpers/validateToken";
import Company from "@/models/Company";

export async function GET(request) {
    try {
        await connectDB();
        const decodedToken =await decodeJWTCompany(request);
        if (!decodedToken) {
            return NextResponse.json({ msg: "Token Validation Error" }, { status: 400 });
        }
        const company = await Company.findOne({ _id: decodedToken.id});
        if (!company) {
            return NextResponse.json({ msg: "Company does not exist:" }, { status: 404 });
        }
        return NextResponse.json({ msg: "Company Found", company }, { status: 200 });
    } catch (error) {
        console.log('Error occured while fetching current internships');
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}