import mongoose from "mongoose";
import jwt from "jsonwebtoken";
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
            minlength: [5, "The minimum characters must not be less than 8 characters"]
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [8, "Password must not be less than 8 characters"],
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
    return jwt.sign(tokenData, JWT_SECRET_ADMIN, {
        expiresIn: '7d'
    })
}
// verifying email method
adminSchema.methods.verifyEmail = function () {
    try {
        const emailResponse = sendEmail(this.email, "VERIFY_EMAIL", this._id.toString(), this.role);
        return emailResponse;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }

};
// reset password method
adminSchema.methods.resetPassword = function () {
    try {
        const emailResponse = sendEmail(this.email, "RESET_PASSWORD", this._id.toString(), this.role);
        return emailResponse;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }

}

const Admin = mongoose.models.admin || mongoose.model('admin', adminSchema);
export default Admin;




/*
When we want a certain documents to be deleted automaticaly we can use the MongoDB TTL feature.
using mongoose also we can achieve this very easiily
For exmaple: 

let currentSchema = mongoose.Schema({
    id: String,
    name: String,
    packageId: Number,
    age: Number
}, {timestamps: true});

currentSchema.index({createdAt: 1},{expireAfterSeconds: 3600});*/