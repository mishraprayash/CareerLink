import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs"



export async function handleEmailVerification(request, Model) {
    try {
        const urlToken = request.nextUrl.searchParams.get('token');
        if (!urlToken) {
            return NextResponse.json({ msg: "No Token" }, { status: 400 });
        }


        /*const decodedToken = decodeJWT(request);
        if (!decodedToken) {
            return NextResponse.json({ msg: "Token Validation Error" }, { status: 400 });
        }

        need to implement the crypto timesafe method to prevent from timing attacks.
        if (!await bcrypt.compare(decodedToken.id, urlToken)) {
            return NextResponse.json({ msg: "Unable to verify email due to access control issue" }, { status: 401 });
        }*/




        const user = await Model.findOne({
            verifyToken: urlToken,
            verifyTokenExpiration: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ msg: "Token Not Found or Token expired" }, { status: 404 });
        }

        user.verified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiration = undefined;
        await user.save();


        return NextResponse.json({ msg: "Email Verified", success: true }, { status: 200 });

    } catch (error) {
        console.log("Error during email verification", error);
        return NextResponse.json({ msg: "Interna Server Error" }, { status: 500 });
    }
}
