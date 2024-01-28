
import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import { decodeJWTCompany } from "@/helpers/validateCompanyToken";
import Internship from "@/models/Internship";

export async function GET(request,{params}) {
    try {
        await connectDB();
        const decodedToken = decodeJWTCompany(request);
        if (!decodedToken) {
            return NextResponse.json({ msg: "Token Validation Error" }, { status: 400 });
        }
        const internship = await Internship.find({ company: decodedToken.id, state: "Approved", _id:params.Id});
        if (!internship) {
            return NextResponse.json({ msg: "No any Internship To Show" }, { status: 404 });
        }
        const applicants = await internship.populate({
            path: 'appliedBy',
            select: '-email -verified -role -address' 
          }).execPopulate();
        if(!applicants){
            return NextResponse.json({message:"NO applicants"})
        }
     return NextResponse.json({msg:"Applicants fetched successfully!", applicants:applicants},{status:200})
    
    } catch (error) {
        console.log('Error occured while fetching applicants');
        return NextResponse.json({ msg: "Internal Server Error" ,error:error }, { status: 500 });
    }
}