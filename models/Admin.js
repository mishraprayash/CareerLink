
import mongoose from "mongoose";
import { SignJWT } from "jose";
import { sendEmail } from "@/helpers/mailservice/sendEmail";


const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please provide an email"],
            match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Provide a valid email']
        },
        username: {
            type: String,
            required: true,
            minLength: [5, "The minimum characters must not be less than 8 characters"]
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minLength: [8, "Password must not be less than 8 characters"]
        },
        verified: {
            type: Boolean,
            required: true,
            default: false
        },
        state: {
            type: String,
            enum: {
                values: ['Pending', 'Approved'],
                message: '{VALUE} is not supported.'
            },
            default: 'Pending'
        },
        role: {
            type: String,
            enum: { values: ['Admin'], message: '{VALUE} isnot supported.' },
            default: "Admin"

        },
        verifyToken: String,
        verifyTokenExpiration: Date,
        forgotPasswordToken: String,
        forgotPasswordTokenExpiration: Date
    },
    {
        timestamps: true
    },

);

// custom validation for handling default values while creating the document for the first time e.g registration
adminSchema.path('state').validate(function (value) {
    if (this.isNew && value !== 'Pending' && this.verified) {
        throw new Error("Invalid State");
    }
    return true;
}, 'There has been attempt to overwrite the default values in the registration process');

// creation of JWT 
adminSchema.methods.createJWT = function () {
    const { JWT_SECRET_ADMIN } = process.env;
    const tokenData = {
        id: this._id,
        username: this.username,
        email: this.email,
        role: this.role
    };
    return new SignJWT({ ...tokenData })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime('1h')
        .setIssuedAt()
        .sign(new TextEncoder().encode(JWT_SECRET_ADMIN));
}
// verifying email method
adminSchema.methods.verifyEmail = async function () {
    try {
        await sendEmail(this.email, "VERIFY_EMAIL", this._id.toString(), this.role);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Failed to send verification email");
    }

};
// reset password method
adminSchema.methods.resetPassword = async function () {
    try {
        await sendEmail(this.email, "RESET_PASSWORD", this._id.toString(), this.role);
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error("Failed to send password reset email");
    }

}
adminSchema.methods.passwordChanged = async function () {
    try {
        console.log("PASSWORD CHANED LINK TO BE SENT");
        await sendEmail(this.email, "PASSWORD_CHANGED", this._id.toString(), this.role);
    } catch (error) {
        console.log(error);
        // throw new Error("Failed to send the password changed link");
    }
}
adminSchema.methods.Rejected = async function () {
    try {
        console.log("Rejected email being sent to", this.username);
        await sendEmail(this.email, "REJECTED", this._id.toString(), this.role);
    } catch (error) {
        console.log(error);
    }
}

adminSchema.methods.Accepted = async function () {
    try {
        console.log("Accepted Email to be sent to ", this.username);
        await sendEmail(this.email, "ACCEPTED", this._id.toString(), this.role);
    } catch (error) {
        console.log(error);
    }
}

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export default Admin;