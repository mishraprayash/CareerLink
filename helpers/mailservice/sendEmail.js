import bcrypt from "bcryptjs";
import Admin from "@/models/Admin";
import Company from "@/models/Company";
import { createTransporter } from "./transporter";
import { mailOptions } from "./mailOptions"


// validation function 
const validateRoleAndEmailType = (role, emailType) => {
    if (role !== "Admin" && role !== "Company") {
        throw new Error("Invalid Role");
    }
    if (emailType !== "VERIFY_EMAIL" && emailType !== "RESET_PASSWORD") {
        throw new Error("Invalid Email Type");
    }
};

// choosing the right user and updating DB
const updateUser = async (role, id, updateOptions) => {
    const Model = role === "Admin" ? Admin : Company;
    await Model.findOneAndUpdate({ _id: id }, updateOptions, { new: true, runValidators: true });
}


export const sendEmail = async (email, emailType, id, role) => {
    try {
        validateRoleAndEmailType(role, emailType);

        const hashedToken = await bcrypt.hash(id, 10);
        const tokenExpiration = Date.now() + 60 * 60 * 1000;

        // correcting the updateOptions
        const updateOptions = emailType === "VERIFY_EMAIL" ? { verifyToken: hashedToken, verifyTokenExpiration: tokenExpiration, } : { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiration: tokenExpiration, }

        const updatedUser = updateUser(role, id, updateOptions);
        if (!updatedUser) {
            throw new Error("Couldnot Update the model");
        }
        var transport = createTransporter();
        const mailoption = mailOptions(email, emailType, hashedToken, role);
        const emailResponse = await transport.sendMail(mailoption);
        return emailResponse;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}
