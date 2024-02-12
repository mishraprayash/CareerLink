
import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import { decodeJWTCompany } from "@/helpers/validateToken";
import Internship from "@/models/Internship";

export async function GET(request, { params }) {
    try {
        await connectDB();
        const decodedToken = await decodeJWTCompany(request);
        if (!decodedToken) {
            return NextResponse.json({ msg: "Token Validation Error" }, { status: 400 });
        }
        const internship = await Internship.findOne({ company: decodedToken.id, state: "Approved", _id: params.Id });
        if (!internship) {
            return NextResponse.json({ msg: "No any Internship To Show" }, { status: 404 });
        }
        console.log(internship)
        const applicants = await internship
            .populate({
                path: 'applicants',
                select: '-email -verified -role -address'
            })
            // console.log(applicants)
        if (!applicants) {
            return NextResponse.json({ message: "NO applicants" })
        }
        console.log(applicants)
        return NextResponse.json({ msg: "Applicants fetched successfully!", applicants: applicants.applicants }, { status: 200 })

    } catch (error) {
        console.log('Error occured while fetching applicants',error);
        return NextResponse.json({ msg: "Internal Server Error", error: error }, { status: 500 });
    }
}