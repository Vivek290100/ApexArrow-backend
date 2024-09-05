import mongoose from 'mongoose';
const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Types.ObjectId,
        ref: "job",
        required: true
    },
    applicant: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
    // role: {
    //     type: String,
    //     enum: ['user', 'admin'],
    //     default: 'user'
    // },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
},{timestamps: true})

export const Application = mongoose.model('Application', applicationSchema);