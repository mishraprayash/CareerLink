import mongoose from "mongoose";
import { SignJWT } from "jose"
import { sendEmail } from "@/helpers/mailservice/sendEmail";
const engineeringCategories = [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Aerospace and Defense",
    "Chemical Engineering",
    "Environmental Engineering",
    "Software and Computer Engineering",
    "Biomedical Engineering",
    "Structural Engineering",
    "Mining and Geological Engineering",
    "Manufacturing Engineering",
    "Robotics Engineering",
    "Renewable Energy",
    "Telecommunications Engineering",
    "Transportation Engineering",
    "Water Resources Engineering",
    "Nuclear Engineering"
];

const industrySectors = [
    "Construction and Infrastructure",
    "Manufacturing, Automotive, Mechanical Systems",
    "Electronics, Telecommunications, Power",
    "Aerospace, Defense, Aviation",
    "Chemicals, Petrochemicals, Pharmaceuticals",
    "Environmental Services, Sustainability",
    "Technology, Information Technology (IT), Software Development",
    "Healthcare, Biotechnology, Medical Devices",
    "Construction and Infrastructure",
    "Mining, Resources",
    "Manufacturing",
    "Technology, Robotics, Automation",
    "Energy, Renewable Energy",
    "Telecommunications, Technology",
    "Transportation, Logistics, Urban Planning",
    "Water Management, Environmental Services",
    "Energy, Nuclear Energy"
];

const photoModel=new mongoose.Schema({
    public_id:String,
    secure_url:String
});
const companySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: [true, "Please provide your company name"]
        },
        email: {
            type: String,
            required: [true, "Please provide your email address"],
            unique: true,
            match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Provide valid email'],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minLength: [8, "Password length must not be less than 8 characters"]
        },
        companyInfo: {
            category: {
                type: String,
                enum: engineeringCategories
            },
            industrySectors: {
                type: String,
                enum: industrySectors
            }
        },
        
        phoneNO:{
            type:Number,
            match:[/^(98|97)\d{8}$/]
        },
        description: {
            type: String,
            minLength: ["50", "Please provide some description about your Company"],
            maxLength: ["500", "Description shouldnot exceed more than 500 characters"],
        },
        logo: photoModel,
        registrationFile: photoModel,
        address: {
            city: String,
            state: String,
            zipCode: String
        },
        foundYear: {
            type: Number,
        },
        verified: {
            type: Boolean,
            default: false
        },
        state: {
            type: String,
            enum: {
                values: ["Pending", "Approved"],
                message: '{VALUE} is not Supported.',
            },
            default: "Pending"
        },
        role: {
            type: String,
            enum: {
                values: ["Company"],
                message: '{VALUE} isnot Supported.'
            },
            default: "Company",
        },
        verifyToken: String,
        verifyTokenExpiration: Date,
        forgotPasswordToken: String,
        forgotPasswordTokenExpiration: Date
    },
    {
        timestamps: true
    }
);

// custom validation for handling default values while creating the document for the first time e.g registration
companySchema.path('state').validate(function (value) {
    if (this.isNew && value !== 'Pending' && this.verified) {
        console.log("Invalid State during registration");
        throw new Error("Invalid State");
    }
    return true;
}, 'There has been attempt to overwrite the default values in the registration process');

// creation of JWT 
companySchema.methods.createJWT = function () {
    const { JWT_SECRET_COMPANY } = process.env;
    const tokenData = {
        id: this._id,
        name: this.companyName,
        email: this.email,
        role: this.role,
        verified: this.verified
    };
    return new SignJWT({ ...tokenData })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime('1h')
        .setIssuedAt()
        .sign(new TextEncoder().encode(JWT_SECRET_COMPANY));
}

// verifying email method
companySchema.methods.verifyEmail = async function () {
    try {
        await sendEmail(this.email, "VERIFY_EMAIL", this._id.toString(), this.role);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

// reset password method
companySchema.methods.resetPassword = async function () {
    try {
        await sendEmail(this.email, "RESET_PASSWORD", this._id.toString(), this.role);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
}


companySchema.methods.passwordChanged = async function () {
    try {
        await sendEmail(this.email, "PASSWORD_CHANGED", this._id.toString(), this.role);
    } catch (error) {
        console.log("Error while sending password changed link", error);
    }
}
companySchema.methods.Rejected = async function () {
    try {
        await sendEmail(this.email, "REJECTED", this._id.toString(), this.role);
    } catch (error) {
        console.log("Error while sending rejected link", error);
    }
}

companySchema.methods.Accepted = async function () {
    try {
        console.log("Accepted Email to be sent to ", this.username);
        await sendEmail(this.email, "ACCEPTED", this._id.toString(), this.role);
    } catch (error) {
        console.log("Error while sending accepted link", error);
    }
}

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);
export default Company;



