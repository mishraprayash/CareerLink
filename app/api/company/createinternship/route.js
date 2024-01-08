import connectDB from "@/config/database";
import Internship from "@/models/Internship";
import { NextResponse } from "next/server";
import { decodeJWTCompany } from "@/helpers/validateCompanyToken";


//while creating a new internship, the creator must be company and should be authenticated.
// the company must have verified their email to create a internship

export async function POST(request) {
    try {
        await connectDB();
        const { position, location, isRemote, workTime, description, startDate, endDate } = await request.json();
        if (!position || !location || !isRemote || !workTime || !description || !startDate || !endDate) {
            return NextResponse.json({ msg: "Missing Fields" }, { status: 400 });
        }
        const token = decodeJWTCompany(request);
        if (!token) {
            return NextResponse.json({ msg: "Invalid Token" }, { status: 400 });
        }
        if (!token.verified) {
            return NextResponse.json({ msg: "Compnay Email isnot verified to create the internship" }, { status: 400 });
        }
        const internship = await Internship.create({
            position, location, isRemote, workTime, description, startDate, endDate,
            company: token.id
        });
        if (!internship) {
            return NextResponse.json({ msg: "Error creating an internship" }, { status: 400 });
        }
        return NextResponse.json({ msg: "Internship created" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}