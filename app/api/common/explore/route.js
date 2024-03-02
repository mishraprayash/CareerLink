import Internship from "@/models/Internship";
import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server"


export async function GET(request) {
    try {
        await connectDB();
        // grabbing the query params from the url
        const searchParams = request.nextUrl.searchParams;
        console.log(searchParams)
        // if searchParams is empty it means no filtering is applied
        const isFilterOn = Object.entries(searchParams).length === 0;


        // creating a obj for applying filter
        let searchObj = {};

        // updating searchObj on the basis of filter
        if (isFilterOn) {
            searchParams.forEach((value, key) => {
                searchObj[key] = value;
            });
        }
        // this is to be default whether or not filter is applied
        searchObj["state"] = "Approved";

        // db query
        const filteredInternships = await Internship.find(searchObj);
        if (!filteredInternships) {
            return NextResponse.json({ msg: "No Internship available" }, { status: 400 })
        }
        return NextResponse.json({ data: filteredInternships }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}