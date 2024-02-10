
import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import { decodeJWTAdmin} from "@/helpers/validateToken";
import Admin from "@/models/Admin";

export async function GET(request) {
    try {
        await connectDB();
        const decodedToken =await decodeJWTAdmin(request);
        if (!decodedToken) {
            return NextResponse.json({ msg: "Token Validation Error" }, { status: 400 });
        }
        const admin = await Admin.findOne({ _id: decodedToken.id});
        if (!admin) {
            return NextResponse.json({ msg: "Admin does not exist:" }, { status: 404 });
        }
        return NextResponse.json({ msg: "Admin Found", admin }, { status: 200 });
    } catch (error) {
        console.log('Error occured while fetching current internships');
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}