import { NextResponse } from "next/server";
import { connectToDB } from '@/utils/connecttodb';
import Internship from "@/models/Internship";
import { getServerSession } from "next-auth/next"
import { handleAuth } from "../../auth/[...nextauth]/route";
import { decodeJWTCompany } from "@/helpers/validateCompanyToken";
import { decodeJWTAdmin } from "@/helpers/validateAdminToken";
export async function GET(request,{params}) {
    try {
        await connectToDB();
       
    const session = await getServerSession(handleAuth)
    const decodedTokenCompany = decodeJWTCompany(request);
    const decodedTokenAdmin=decodeJWTAdmin(request)
    if(!session && !decodedTokenCompany && !decodedTokenAdmin){
     return NextResponse.json({
       msg: "You must be signed in to view interships on this page.",
     },{status:401})
   }
        const allInternships = await Internship.find({state: "Approved" ,_id:params.Id});

        return NextResponse.json({
            msg: 'Internships fetched successfully',
            Internships: allInternships
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            msg:"Error fetching internships",error:error
          },{status:500})
    }
}
