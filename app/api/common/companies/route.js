import connectDB from "@/config/database";
import Company from "@/models/Company";
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        await connectDB();
        const affiliatedCompanies = await Company.find({ state: "Approved" });
        if (affiliatedCompanies.length === 0) {
            return NextResponse.json({ msg: "No Companies to show" }, { status: 200 });
        }
        return NextResponse.json({ msg: "Companies Found", Companies: affiliatedCompanies }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}