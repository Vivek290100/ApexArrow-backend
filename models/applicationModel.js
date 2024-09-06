import mongoose from 'mongoose';
const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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