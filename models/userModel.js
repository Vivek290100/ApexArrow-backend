import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true, unique: true },
    role: { type: String, required: true, enum:["student", "recruiter"], required: true },
    profile: { bio: { type: String}, 
               skills: [{ type: String}],
               resume: { type: String},
               resumeOriginalName: { type: String},
               company: { type:mongoose.Schema.Types.ObjectId, ref: 'company'},
               profilePhoto: { type: String, default: ""},
            },
    // isActive: { type: Boolean, required: true, default: true },
    // lastLogin: { type: Date },
    // resetToken: String,
    // resetTokenExpiration: Date  
},{timestamps:true})

export const User = mongoose.model('User',userSchema);