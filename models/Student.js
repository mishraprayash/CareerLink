import mongoose from 'mongoose';
const photoModel=new mongoose.Schema({
    public_id:String,
    secure_url:String
});
const socialMediaSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['linkedin', 'github', 'other'],
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});
const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Provide a name"],
            minlength: 1,
            maxlength: 50
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Provide valid email'],
            unique: true
        },
         profilePicture: photoModel
        ,
        cv:photoModel,
        certificates: [photoModel],
        gender:{
            type:String,
            enum:["Male","Female"]
        },
        age:{
            type:Number,
        },
        about:{
            type:String,
        },
        bio:{
            type:String,
        },
        address:{
            state:{
                type:String,
            },
            district:{
                type:String,
            },
            street:{
                type:String,
            }
        },
        socialmedia:[socialMediaSchema],
        role: {
            type: String,
            enum: {
                values: ["Student"],
                message: '{VALUE} isnot Supported.'
            },
            default: "Student",
        },
        profileStatus:{
            type:String,
            default:"Incomplete",
            enum:["Complete","Incomplete","Inactive"]
        },
    },
    {
        timestamps: true
    })
    
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
export default Student;
