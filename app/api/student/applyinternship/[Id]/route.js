import connectDB from "@/config/dbconfig/database";
import Internship from "@/models/Internship";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { handleAuth } from "@/app/api/auth/[...nextauth]/route";
import Student from "@/models/Student";

//while creating a new internship, the creator must be company and should be authenticated.
// the company must have verified their email to create a internship

export async function PATCH(request, { params }) {
    try {
        const session = await getServerSession(handleAuth)
        // console.log(session)
        if(!session){
            return NextResponse.json({
              msg: "You must be signed in to view the protected content on this page.",
            },{status:401})
          }

        await connectDB();
        // console.log(session.user.email)
        // console.log(params.Id)
        const studentEmail=session.user.email
const internship=await Internship.findById(params.Id)

        if (!internship) {
            return NextResponse.json({ msg: " internship -Unavailable" }, { status: 400 });
        }
    
    const student =await Student.findOne({email:studentEmail ,profileStatus:"Complete"})
    if(!student){
        return NextResponse.json({ msg: "Verify your email." }, { status: 400 });
    
    }
      // Check if the student has already applied to this internship
      if (internship.applicants.includes(student._id)) {
        return NextResponse.json({ msg: "You have already applied for this internship." }, { status: 400 });
    }
        await internship.applicants.push(student._id)
 await internship.save()
        return NextResponse.json({ msg: "Successfully applied for internship" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}