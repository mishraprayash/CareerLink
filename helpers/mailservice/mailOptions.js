export const mailOptions = (email,emailType,hashedToken,role) => {
    return {
        from: "careerlink@business.co",
        to: email,
        html:
            emailType === "VERIFY_EMAIL"
                ? `
          <h2>Verify Your Email</h2>
          <p>Please click on the link below to verify your email</p>
          <a href="${process.env.DOMAIN}/api/${role.toLowerCase()}/verifyemail?token=${hashedToken}">Verify</a>
          `
                : `<h2>Reset your password</h2> 
          <p>Please click on the link below to reset your password</p>
          <a href="${process.env.DOMAIN}/api/${role.toLowerCase()}/resetpassword?token=${hashedToken}">Reset Password</a>
          `,
    };
}