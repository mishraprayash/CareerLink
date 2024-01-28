import { NextResponse } from "next/server"

export async function handleVerificationLink(Model, token) {
    try {
        // checking in the DB if user exist
        const user = await Model.findById(token.id);
        if (!user) {
            const response = NextResponse.json({ msg: "User doesnot exist" }, { status: 404 });
            response.cookies.set('token', "", { httpOnly: true, expires: new Date(0) });
            return response;
        }
        // checking if user is already verified
        if (user.verified) {
            return NextResponse.json({ msg: "User already verified" }, { status: 400 });
        }
        // checking if user is approved or not
        if (user.state != "Approved") {
            return NextResponse.json({ msg: `${Model} must be approved by admin first` }, { status: 400 });
        }
        // sending verification link
        await handleSendingEmail(user);

        return NextResponse.json({ msg: "Verification Email Sent Successfully" }, { status: 200 });

    } catch (error) {
        console.log("Error in sending verification link", error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }

}

// function for sending email
async function handleSendingEmail(user) {
    try {
        await user.verifyEmail();
        console.log(`Verification Link sent successfuly for ${user.email} in ${new Date()}}`);
    } catch (error) {
        console.log(error);
    }
}