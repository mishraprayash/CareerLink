import mongoose from "mongoose";

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
            enum: ['Pending', 'Approved'],
            default: 'Pending'
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpires: Date
    },
    {
        timestamps: true
    },


);

adminSchema.pre('save', function (next) {
    if (this.isNew && this.state !== "Pending") {
        return next(new Error("Invalid state for saving the document"));
    }
    next();
});

const Admin = mongoose.models.admin || mongoose.model('admin', adminSchema);
export default Admin;
