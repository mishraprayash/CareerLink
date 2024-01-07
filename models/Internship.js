
import mongoose from "mongoose"

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
        description: {
            type: String,
            minlength: 50,
            maxlength: 300,
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
            ref: 'Company'
        },
        role: {
            type: String,
            enum: {
                values: ["Internship"],
                message: '{VALUE} isnot Supported.'
            },
            default: "Internship",
        },
    },
    {
        timestamps: true
    }
);

internshipSchema.pre('save', function (next) {
    if (this.isNew && this.state !== "Pending") {
        return next(new Error("Invalid State"));
    }
    next();
})
const Internship = mongoose.models.Internship || mongoose.model('Internship', internshipSchema);

export default Internship;