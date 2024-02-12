import connectDB from "@/config/dbconfig/database";
import Student from "@/models/Student";
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { handleAuth } from "../../auth/[...nextauth]/route";
export async function GET(request) {
    try {
        const session = await getServerSession(handleAuth)
        if(!session){
         return NextResponse.json({
           msg: "You must be signed in to view the protected content on this page.",
         },{status:401})
       }
       const studentEmail=session.user.email;
        await connectDB();
       
        const student = await Student.findOne({email:studentEmail});
        if (!student) {
            return NextResponse.json({ msg: "Student doesnot exist" }, { status: 404 });
        }
        return NextResponse.json({ student }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}