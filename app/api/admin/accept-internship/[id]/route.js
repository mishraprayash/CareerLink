import connectDB from "@/config/database";
import Internship from "@/models/Internship";
import { NextResponse } from "next/server";
export async function UPDATE(request, { params }) {
    try {
        await connectDB();
        if (!params.id) {
            return NextResponse.json({ msg: "Internship Id not Found" }, { status: 400 });
        }
        const approveInternship = Internship.findByIdAndUpdate({ _id: params.id }, { $set: { state: "Approved" } });
        if (!approveInternship) {
            return NextResponse.json({ msg: "Error occcured while udpating..." }, { status: 400 })
        }
        return NextResponse.json({ msg: "Internship Approved" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}