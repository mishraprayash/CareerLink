
import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import bcryptjs, { compareSync } from "bcryptjs";

/* 
this endpoint is not validating the identity of the user sending this request.
if someone could get acess to this URL token before it expires then it can be 
used to change of password of the user associated with the token.

It must be prevented as if an attacker gets access to the account they could change 
the password as they wanted and get access to the account.


*/

export async function POST(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');
        const { password, confirmPassword } = await request.json();
        if (!(token && password && confirmPassword)) {
            return NextResponse.json({ msg: "Not a valid password or token" }, { status: 400 });
        }
        if (password !== confirmPassword) {
            return NextResponse.json({ msg: "Password and ConfirmPassword doesnot match" }, { status: 400 });
        }
        const admin = await Admin.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiration: { $gt: Date.now() },
        });
        if (!admin) {
            return NextResponse.json({ msg: "Invalid Token or Token Expired" }, { status: 400 });
        }
        const checkOldPassword = await bcryptjs.compare(password, admin.password);
        console.log(checkOldPassword);
        if (checkOldPassword) {
            return NextResponse.json({ msg: "This password has already been used in the past times. Please provide another password" }, { status: 400 });
        }
        admin.password = await bcryptjs.hash(confirmPassword, 10);
        admin.forgotPasswordToken = undefined;
        admin.forgotPasswordTokenExpiration = undefined;
        admin.state = "Pending";
        await admin.save();
        console.log("Here came");

        await sendPasswordChangedLink(admin);

        console.log(`Password changed for admin with username: ${admin.username} at ${new Date()}`);
        return NextResponse.json({ msg: "Password Changed Successfully. Now you need to be again approved by admin to access the admin portal", }, { status: 200, });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}


async function sendPasswordChangedLink(admin) {
    try {
        console.log("Called this passwordChanged func");
        await admin.passwordChanged();
    } catch (error) {
        console.log(error);

    }
}   