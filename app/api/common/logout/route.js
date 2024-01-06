import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({ msg: "Logout Success", success: true, });
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        return response;
    } catch (error) {
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}