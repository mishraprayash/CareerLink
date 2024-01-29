import Internship from "@/models/Internship";
import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        await connectDB();
        const allInternships = await Internship.find({ state: "Approved" });
        if (!allInternships) {
            return NextResponse.json({ msg: "No Internship available" }, { status: 200 })
        }
        return NextResponse.json({ data: allInternships }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}