
export const mailOptions = (email, emailType, hashedToken, role) => {

    const emailTemplates = new Map([
        ["VERIFY_EMAIL", `
            <h2>Verify Your Email</h2>
            <p>Please click on the link below to verify your email</p>
            <a href="${process.env.DOMAIN}/api/${role.toLowerCase()}/verifyemail?token=${hashedToken}">Verify</a>`],

        ["PASSWORD_CHANGED", `
            <h2>Your password has been changed successfully at ${new Date()}</h2>
            <p>If this is not you, please contact us at our email <a href="mailto:careerlink.team@business.co">careerlink.team@business.co</a></p>`],

        ["RESET_PASSWORD", `
            <h2>Reset your password</h2> 
            <p>Please click on the link below to reset your password</p>
            <a href="${process.env.DOMAIN}/api/${role.toLowerCase()}/resetpassword?token=${hashedToken}">Reset Password</a>`],

        ["ACCEPTED", `
            <h3>Hello, you have been accepted as one of our admins. Please take the responsibility seriously.</h3>`],

        ["REJECTED", `
            <h3>Hello, you have been rejected for the admin post.</h3>`],
    ]);

    const emailToBeSent = emailTemplates.get(emailType) || null;

    if (!emailToBeSent) {
        // Handle invalid emailType
        console.error(`Invalid emailType: ${emailType}`);
        return null;
    }

    return {
        from: "careerlink@business.co",
        to: email,
        html: emailToBeSent
    };
};
