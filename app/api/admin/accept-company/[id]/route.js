import connectDB from "@/config/database";
import Company from "@/models/Company";
import { NextResponse } from "next/server";
export async function UPDATE(request, { params }) {
    try {
        await connectDB();
        if (!params.id) {
            return NextResponse.json({ msg: "Company Id not Found" }, { status: 400 });
        }
        const approveCompany = Company.findByIdAndUpdate({ _id: params.id }, { $set: { state: "Approved" } });
        if (!approveCompany) {
            return NextResponse.json({ msg: "Error occcured while udpating..." }, { status: 400 })
        }
        return NextResponse.json({ msg: "Company Approved" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}