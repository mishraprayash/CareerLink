import connectDB from "@/config/database";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server"

export async function PATCH(request, { params }) {
    try {
        await connectDB();
        // const { id } = await request.json();
        // if params is passed we can use this
        if (!params.id) {
            return NextResponse.json({ msg: "Invalid request, Id not provided" });
        }
        const approveAdmin = await Admin.findByIdAndUpdate({ _id: params.id }, { $set: { state: "Approved" } });
        if (!approveAdmin) {
            return NextResponse.json({ msg: "Admin not Found" }, { status: 400 })
        }
        return NextResponse.json({ msg: "Success" })
    } catch (error) {
        return NextResponse.json({ msg: "Internal Serval Error" }, { status: 500 })
    }

}