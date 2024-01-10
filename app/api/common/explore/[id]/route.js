import Internship from "@/models/Internship";
import connectDB from "@/config/database";
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    try {
        await connectDB();
        const internship = await Internship.findOne({ _id: params.id, state: "Approved" });
        if (!internship) {
            return NextResponse.json({ msg: "No Internship available" }, { status: 200 })
        }
        return NextResponse.json({ data: internship }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}