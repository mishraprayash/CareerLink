


import connectDB from "@/config/dbconfig/database";
import { decodeJWTCompany } from "@/helpers/validateToken";
import Internship from "@/models/Internship";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();

        // retrieving company id so that we can fetch the pending internships for that specific company
        const decodeToken =await decodeJWTCompany(request);

        // grabbing the pending internships by referencing the company attribute.
        const pendingInternships = await Internship.find({ company: decodeToken.id, state: "Pending" });

        if (!pendingInternships || pendingInternships.length === 0) {
            return NextResponse.json({ msg: "No any pending internships found" }, { status: 200 });
        }

        // returning pendingInternships
        return NextResponse.json({ data: pendingInternships }, { status: 200 });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}