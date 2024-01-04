import mongoose from 'mongoose';

const certificatesSchemaObject = [
    {
        type: Buffer,
        category: {
            type: String,
            
        },
        updatedAt: Date.now()
    }
];
const studentSchema = new mongoose.Schema({
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
    profilePicture: {
        type: Buffer,
        required: true
    },
    certificates: certificatesSchemaObject
}, {
    timestamps: true, // This will add createdAt and updatedAt fields
  })

const StudentModel = mongoose.model('Student', studentSchema) || mongoose.models.Student;
export default StudentModel;