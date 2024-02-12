

import connectDB from "@/config/dbconfig/database";
import Internship from "@/models/Internship";
import { NextResponse } from "next/server";
import { decodeJWTCompany } from "@/helpers/validateToken";
import Company from "@/models/Company";


//while creating a new internship, the creator must be company and should be authenticated.
// the company must have verified their email to create a internship

export async function POST(request) {
    try {
        await connectDB();

        // grabbing all the values that will be sent from the client side
        const { position, location, isRemote, workTime, description, startDate, endDate ,responsibilities,requirements,internshipType,salary,noofVacancy} = await request.json();

        // validating if the given value is empty or not
        if (!position || !location || !isRemote || !workTime || !description || !startDate || !endDate || !responsibilities || !requirements || !internshipType || !noofVacancy) {
            return NextResponse.json({ msg: "Missing Fields" }, { status: 400 });
        }
        // grabbing the token to access the id of the user
        const decodedToken = await decodeJWTCompany(request);
        if(!decodedToken){
            return NextResponse.json({ msg: "Login Required!" }, { status: 400 });
        }
        // checking if user really exist or not taking the id params
        const companyExist = await Company.findOne({ _id: decodedToken.id, verified: true, state: "Approved" });

        if (!companyExist) {
            return NextResponse.json({ msg: "Not allowed to create the internships" }, { status: 400 });
        }
        console.log(companyExist.logo)
        // creating a new internship on the basis of request body.
        const internship = await Internship.create({
            position, location, isRemote, workTime, description, startDate, endDate,
            company: companyExist._id,
            companyName:companyExist.companyName,
            companyLogo:companyExist.logo,
            responsibilities,
            requirements,
            internshipType,
            salary,
            noofVacancy
        });

        if (!internship) {
            return NextResponse.json({ msg: "Error creating an internship" }, { status: 400 });
        }
        // returning the created status
        return NextResponse.json({ msg: "Internship created" }, { status: 201 });

    } catch (error) {

        // checking if the error is from the request body data
        if (error instanceof SyntaxError) {
            return NextResponse.json({ msg: "Invalid JSON request body" }, { status: 400 });
        }

        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}