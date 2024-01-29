import connectDB from "@/config/dbconfig/database";
import Student from "@/models/Student";
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = params;
        const student = await Student.findById(id);
        if (!student) {
            return NextResponse.json({ msg: "Student doesnot exist" }, { status: 404 });
        }
        return NextResponse.json({ student }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}