import { NextResponse } from "next/server";
import { connectToDB } from '@/utils/connecttodb';
import Internship from "@/models/Internship";

export async function POST(request) {
    console.log(request)
    try {
        await connectToDB();
        const body=await request.json()
const {position, location,isRemote,workTime,description,startDate,endDate}=body

        const internship = await Internship.create({
            position, location,isRemote,workTime,description,startDate,endDate,state:"Pending"
        });

        return NextResponse.json({
            msg: 'Internships created successfully',
            Internships: internship
        }, { status: 200 });
    } catch (error) {
        console.log(error);
    }
}
