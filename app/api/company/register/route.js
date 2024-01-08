import connectDB from "@/config/database";
import Company from "@/models/Company";
import { NextResponse } from "next/server";


export async function POST(request){
    try {
        await connectDB();

    } catch (error) {
        return NextResponse.json({msg:"Internal Server Error"},{status:500})
    }
}