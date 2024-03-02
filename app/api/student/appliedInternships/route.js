import { NextResponse } from "next/server";
import Internship from "@/models/Internship";
import { getServerSession } from "next-auth/next"
import { handleAuth } from "../../auth/[...nextauth]/route";
import Student from "@/models/Student";
import connectDB from "@/config/dbconfig/database";

export async function GET(request) {
    try {
        await connectDB()
       
    const session = await getServerSession(handleAuth)
    if(!session){
     return NextResponse.json({
       msg: "You must be signed in to view interships on this page.",
     },{status:401})
   }
   const studentEmail=session.user.email;
   const student=await Student.findOne({email:studentEmail})
   const studentId=student._id;
        const Internships = await Internship.find({
            applicants: { $in: [studentId] },
            state: "Approved"
        });
        if (!Internships || Internships.length === 0) {
            return NextResponse.json({
                msg: 'No internships found for the specified student',
            }, { status: 200 });

        }
        return NextResponse.json({
            msg: 'Internships fetched successfully',
            Internships: Internships
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            msg: "Error fetching internships", error: error
        }, { status: 500 })
    }
}
