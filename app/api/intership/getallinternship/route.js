import { NextResponse } from "next/server";
import { connectToDB } from '@/utils/connecttodb';
import Internship from "@/models/Internship";
import { getSession } from "next-auth/react";
export async function GET(request) {
    try {
        await connectToDB();
        const session = await getSession({ request });
        if (!session) {
          console.log("signin required")
        }
        console.log(session)
        const allInternships = await Internship.find({});

        return NextResponse.json({
            msg: 'Internships fetched successfully',
            Internships: allInternships
        }, { status: 200 });
    } catch (error) {
        console.log(error);
    }
}
