


import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import { decodeJWTCompany } from "@/helpers/validateToken";
import Internship from "@/models/Internship";

export async function GET(request) {
    try {
        // db connection
        await connectDB();

        // grabbing the coookies and decoding it to access the id
        const decodedToken = await decodeJWTCompany(request);

        // filtering internship according to the id and state
        const runningInternship = await Internship.find({ company: decodedToken.id, state: "Approved", isCompleted: false });

        if (!runningInternship || runningInternship.length === 0) {
            return NextResponse.json({ msg: "No any Internship Found" }, { status: 200 });
        }
        return NextResponse.json({ data: runningInternship }, { status: 200 });

    } catch (error) {

        console.log('Error occured while fetching current internships');
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}