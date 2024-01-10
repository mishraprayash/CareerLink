// import { NextResponse } from "next/server"

// export async function handleVerificationLink(request, Model) {
//     try {
//         const decodedToken = decodeJWT(request);
//         if (!decodedToken) {
//             return NextResponse.json({ msg: "Token Validation Error" }, { status: 400 });
//         }
//         const user = await Model.findById(decodedToken.id);
//         if (!user) {
//             return NextResponse.json({ msg: "User Not Found" }, { status: 404 });
//         }
//         const emailResponse = user.verifyEmail();
//         return NextResponse.json({ msg: "Verification Email Sent Successfully" });
//     } catch (error) {
//         console.log("Error in sending verification link", error);
//         return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
//     }

// }