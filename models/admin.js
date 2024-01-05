import mongoose from "mongoose";
import jwt from "jsonwebtoken";

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
            minlength: [8, "The minimum characters must not be less than 8 characters"]
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [8, "Password must not be less than 8 characters"],
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
        forgotPasswordToken: String,
        forgotPasswordTokenExpires: Date
    },
    {
        timestamps: true
    },

);

adminSchema.pre('save', function (next) {
    if (this.role !== "Admin") {
        return next(new Error("Invalid role assignment during creation of document"));
    }
    if (this.isNew && this.state !== "Pending") {
        return next(new Error("Invalid state for saving the document"));
    }
    next();
});

adminSchema.methods.createJWT = function () {
    const { JWT_SECRET } = process.env;
    const tokenData = {
        id: this._id,
        username: this.username,
        email: this.email,
        role: this.role
    };
    return jwt.sign(tokenData,JWT_SECRET,{
        expiresIn:'7d'
    })
}
const Admin = mongoose.models.admin || mongoose.model('admin', adminSchema);
export default Admin;
