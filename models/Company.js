import mongoose from "mongoose";
import jwt from "jsonwebtoken";

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

const companySchema = new mongoose.Schema(
    {
        name: {
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
            minlength: [8, "Password length must not be less than 8 characters"]
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
        logo: {
            type: Buffer,
            required: [true, "Please provide the company logo"]
        },
        registrationFile: {
            data: {
                type: Buffer,
                required: [true, "Please provide the registrationn file of your company"],
                unique: true
            }
        },
        address: {
            city: String,
            state: String,
            zipCode: String
        },
        foundYear: {
            type: Number,
            required: [true, "Please provide the found year"]
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
        }
    },
    {
        timestamps: true
    }
);

companySchema.pre('save', function (next) {
    if (this.isNew && this.state !== "Pending") {
        return next(new Error("Invalid State"));
    }
})
companySchema.methods.createJWT() = function (){
    const { JWT_SECRET } = process.env;
    const tokenData = {
        id: this._id,
        name:this.name,
        email: this.email,
        role: this.role
    };
    return jwt.sign(tokenData,JWT_SECRET,{
        expiresIn:'7d'
    })
}

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);
export default Company;



