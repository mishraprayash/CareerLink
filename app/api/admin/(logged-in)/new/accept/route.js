import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import { validateModel } from "../validateModel";

/*for passing role use the useState hook in the client side to update the state
id for one(admin or internship or company) that needs to be accepted. 
Role means ModelType  here.*/


/* when rendering pending admins, companies or internships we receive the role attribute in the response from where
 we will send it to the server when a request is send along with the id  */


export async function POST(request) {
    try {
        await connectDB();
        const { id, role } = await request.json();
        console.log(id, role);
        if (!id || !role) {
            return NextResponse.json({ msg: "Invalid id or role" }, { status: 400 });
        }
        // const decodedToken = 
        const Model = validateModel(role);
        const admin = await Model.findById(id);

        if (!admin) {
            return NextResponse.json({ msg: `${role} doesnot exist` }, { status: 400 });
        }
        if (admin.state === "Approved") {
            return NextResponse.json({ msg: `${role} already approved` }, { status: 200 });
        }
        admin.state = "Approved";
        await admin.save();

        await sendAcceptedEmail(admin);
        return NextResponse.json({ msg: `${role} Approved` }, { status: 200 });

    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({ msg: "Invalid JSON in the request body" }, { status: 400 });
        }
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" });
    }
}

async function sendAcceptedEmail(admin) {
    try {
        await admin.Accepted();
    } catch (error) {
        console.log(error);
    }
}