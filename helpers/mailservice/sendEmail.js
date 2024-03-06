import bcrypt from "bcryptjs";
import Admin from "@/models/Admin";
import Company from "@/models/Company";
import { mailOptions } from "./mailOptions"
import { emailQueue } from "@/config/redisconfig/redis-bullmq";


// validation function 

// here the 'role' basically refers to what type of user is being sent the email.

const validateRoleAndEmailType = (role, emailType) => {
    if (role !== "Admin" && role !== "Company") {
        console.log("Invalid role type");
        throw new Error("Invalid Role");
    }
    const acceptedEmailTypes = ["VERIFY_EMAIL", "RESET_PASSWORD", "PASSWORD_CHANGED", "ACCEPTED", "REJECTED"];
    if (!acceptedEmailTypes.includes(emailType)) {
        console.log("Invalid Email Type");
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
        if (emailType === "VERIFY_EMAIL" || emailType === "RESET_PASSWORD") {

            const updateOptions = emailType === "VERIFY_EMAIL" ? { verifyToken: hashedToken, verifyTokenExpiration: tokenExpiration, } : { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiration: tokenExpiration, }
            const updatedUser = updateUser(role, id, updateOptions);
            if (!updatedUser) {
                throw new Error("Couldnot Update the model");
            }
        }
        const mailoption = mailOptions(email, emailType, hashedToken, role);

        // we are using bullMQ for adding a email service in the queue which is executed in the next server(Worker)
        // this is the producer code

        await emailQueue.add(`${id}-${role}`, mailoption);

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}
