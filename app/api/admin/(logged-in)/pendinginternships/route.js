import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import Internship from "@/models/Internship";

export async function GET(request) {
    try {
        await connectDB();
        // returns an arrray
        const pendingInternships = await Internship.find({ state: "Pending" });
        if (pendingInternships.length === 0) {
            return NextResponse.json({ msg: "No any pending internships" }, { status: 404 });
        }
        return NextResponse.json({ data: pendingInternships }, { status: 200 });
    } catch (error) {
        console.log('Error fetching pending internship');
        return NextResponse.json({msg:"Internal Server Error"},{status:500});
    }
}