
import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import { decodeJWTCompany } from "@/helpers/validateToken";
import Internship from "@/models/Internship";

export async function GET(request,{params}) {
    try {
        await connectDB();
        const decodedToken = decodeJWTCompany(request);
        if (!decodedToken) {
            return NextResponse.json({ msg: "Token Validation Error" }, { status: 400 });
        }
        const internship = await Internship.find({ company: decodedToken.id, state: "Approved", _id:params.Id});
        if (!internship) {
            return NextResponse.json({ msg: "No any Internship To Show" }, { status: 404 });
        }
        return NextResponse.json({ msg: "Internship Found", internship }, { status: 200 });
    } catch (error) {
        console.log('Error occured while fetching current internships');
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}