import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import Admin from "@/models/Admin";

export async function GET(request) {
    try {
        await connectDB();
        // return an array
        const pendingAdmins = await Admin.find({ state: "Pending", verified: true });
        if (pendingAdmins.length === 0) {
            return NextResponse.json({ msg: "No any pending admins" }, { status: 404 });
        }
        return NextResponse.json({ data: pendingAdmins }, { status: 200 });
    } catch (error) {
        console.log('Error fetching pending admins');
        return NextResponse.json({msg:"Internal Server Error"},{status:500});
    }
}