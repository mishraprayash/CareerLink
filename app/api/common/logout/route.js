import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const token = request.cookies.get('token');
        if (!token) {
            return NextResponse.json({ msg: "You have to be logged in first" }, { status: 400 });
        }
        const response = NextResponse.json({ msg: "Logout Success", success: true, });
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        response.cookies.set("company", "", { httpOnly: true, expires: new Date(0) });
        response.cookies.set("admin", "", { httpOnly: true, expires: new Date(0) });
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}