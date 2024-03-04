import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import Company from "@/models/Company";

export async function GET(request) {
    try {
        await connectDB();
        // returns an arrray
        const pendingCompanies = await Company.find({ state: "Pending"});
        if (pendingCompanies.length === 0) {
            return NextResponse.json({ msg: "No any companies" }, { status: 404 });
        }
        return NextResponse.json({ data: pendingCompanies }, { status: 200 });
    } catch (error) {
        console.log('Error fetching pending companies');
        return NextResponse.json({msg:"Internal Server Error"},{status:500});

    }
}