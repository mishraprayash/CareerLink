import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import { validateModel } from "../validateModel";

export async function POST(request) {
    try {
        await connectDB();
        const { id, role } = await request.json();
        if (!id || !role) {
            return NextResponse.json({ msg: "Invalid id or role" }, { status: 400 });
        }
        const Model = validateModel(role);
        if (!Model) {
            return NextResponse.json({ msg: "Invalid role" }, { status: 400 });
        }
        const user = await Model.findById(id);
        if (!user) {
            return NextResponse.json({ msg: `${role} doesnot exist` }, { status: 400 });
        }
        const rejectUser = await Model.findByIdAndDelete(id);
        if (!rejectUser) {
            return NextResponse.json({ msg: `Invalid Id or couldnot reject the ${role}` }, { status: 400 });
        }
        console.log(rejectUser);
        await sendRejectedEmail(rejectUser);
        return NextResponse.json({ msg: `${role} Rejected` }, { status: 200 });

    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({ msg: "Invalid JSON in the request body" }, { status: 400 });
        }
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 404 });
    }
}
async function sendRejectedEmail(admin) {
    try {
        await admin.Rejected();
    } catch (error) {
        console.log(error);
    }
}