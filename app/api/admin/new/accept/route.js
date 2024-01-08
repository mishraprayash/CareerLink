import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import { validateModel } from "../validateModel";
// import { decodeJWT } from "@/helpers/getDatafromtoken";

export async function POST(request) {
    try {
        await connectDB();
        // for passing role use the useState hook in the client side to update the state
        // id for one that needs to be acceppted and role means Model here.
        const { id, role } = await request.json();
        if (!id || !role) {
            return NextResponse.json({ msg: "Invalid id or role" }, { status: 400 });
        }
        const Model = validateModel(role);
        const approveModel = await Model.findByIdAndUpdate({ _id: id }, { $set: { state: "Approved" } }, { new: true });
        if (!approveModel) {
            return NextResponse.json({ msg: `Invalid Id or couldnot accept the ${role}` }, { status: 400 });
        }
        return NextResponse.json({ msg: `${role} Approved` }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" });
    }
}