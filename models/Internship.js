
import mongoose from "mongoose"
import { Schema } from "mongoose";
const photoModel=new mongoose.Schema({
    public_id:String,
    secure_url:String
});
const internshipSchema = new mongoose.Schema(
    {
        position: {
            type: String,
            required: [true, "Please provide the asked position"]
        },
        location: {
            type: String,
            required: [true, "Please provide the location of the internship"]
        },
        isRemote: {
            type: Boolean,
            required: [true, "Provide whether the internship is remote or onsite"]
        },
        workTime: {
            type: String,
            enum: ['Full-Time', 'Part-Time', "Hybrid"]
        },
        noofVacancy:{
            type:Number,
            required:[true,"How many interns?"]
        },
        responsibilities:{
            type:String,
            required:[true,"Add responsibilities of intern"]
        },
        requirements:{
            type:String,
            required:[true,"Requirements?"]
        },
        internshipType:{
            type: String,
            enum: ['Paid', 'Unpaid']
        },
        salary:{
            type:Number,
            match: /^[0-9]{3,}$/,
        },
        skillsRequired:[{type:String}],
        description: {
            type: String,
            minLength: 50,
            maxLength: 300,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        state: {
            type: String,
            enum: ['Approved', 'Pending'],
            default: "Pending",
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true
        },
        companyName:{
            type:String,
            required:[true,"Company Name required"]
        },
        companyLogo:photoModel,
        applicants:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
            }
        ],
        role: {
            type: String,
            enum: {
                values: ["Internship"],
                message: '{VALUE} isnot Supported.'
            },
            default: "Internship",
        },

        isCompleted: {
            type: Boolean,
            // required: true,
            // defining a getter function
            get: function () {
                return new Date() > this.endDate ? true : false;
            }
        }
    },
    {
        timestamps: true
    }
);


internshipSchema.path('state').validate(function (value) {
    if (this.isNew && this.state !== "Pending") {
        throw new Error("Invalid State");
    }
    return true;
}, 'There has been attempt to overwrite the default values in the creation process');



const Internship = mongoose.models.Internship || mongoose.model('Internship', internshipSchema);
export default Internship;