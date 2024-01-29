
import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { decodeJWTAdmin } from "@/helpers/validateToken";
import Admin from "@/models/Admin";

export async function POST(request) {
    try {
        // connecting to the Database
        await connectDB();
        const { currentPassword, newPassword, confirmNewPassword } = await request.json();

        // server side simple validation
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return NextResponse.json({ msg: "Missing Password" });
        }
        if (currentPassword === newPassword) {
            return NextResponse.json({ msg: "You have already used this password in the past" }, { status: 400 });
        }
        if (newPassword !== confirmNewPassword) {
            return NextResponse.json({ msg: "newPassword and confirmNewPassword doesnot match" });
        }
        // grabbing cookies from the header.
        const decodedToken = await decodeJWTAdmin(request);

        // console.log(decodedToken);
        // decoding token and getting id of the user and checking if the user actually is a valid admin or not.
        const adminExist = await Admin.findById(decodedToken.id);
        // if not a valid user reseting the token
        if (!adminExist) {
            const response = NextResponse.json({ msg: "Unauthenticated Request" }, { status: 400 });
            response.cookies.set('token', "", { httpOnly: true }, { secure: true });
            return response;
        }
        // if adminExist checking if a old Password matches
        const isValidCurrentPassword = await bcrypt.compare(currentPassword, adminExist.password);
        // is ma
        if (!isValidCurrentPassword) {
            const response = NextResponse.json({ msg: "Your currentPassword is wrong" }, { status: 400 });
            response.cookies.delete('token');
            return response;
        }
        // after verifying that user knows the curretn pasword we hashed the new password ans store it in the database.
        adminExist.password = await bcrypt.hash(confirmNewPassword, 10);
        await adminExist.save();

        // logging when the password was chanaged.
        console.log(`Password Changed Successfully for the admin with username ${adminExist.username} in ${new Date()}`);
        // creating a response
        const response = NextResponse.json({ msg: "Password Changed Successfully. Please login again." }, { status: 200 });
        // deleting a cookie as user need to login again after changing a password
        response.cookies.delete('token');
        return response;

    } catch (error) {
        console.log("Error occured while changing the password", error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}