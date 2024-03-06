import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import { validateModel } from "../validateModel";
import Company from "@/models/Company";

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
        const user = await Model.findById(id);

        if (!user) {
            return NextResponse.json({ msg: `${role} doesnot exist` }, { status: 400 });
        }
        if (user.state === "Approved") {
            return NextResponse.json({ msg: `${role} already approved` }, { status: 200 });
        }
        user.state = "Approved";
        await user.save();
        
        // if (user.role === "Internship") {
        //     const companyId = user.company;
        //     const company = await Company.findById(companyId);
        //     await sendAcceptedEmail(company);
        // }
        // else {
        //     await sendAcceptedEmail(user);
        // }
        return NextResponse.json({ msg: `${role} Approved` }, { status: 200 });

    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({ msg: "Invalid JSON in the request body" }, { status: 400 });
        }
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" });
    }
}

async function sendAcceptedEmail(user) {
    try {
        await admin.Accepted();
    } catch (error) {
        console.log(error);
    }
}