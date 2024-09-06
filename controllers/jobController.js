import { Job } from "../models/jobModel.js"


export const postjob = async (req, res) => {
    try {
        const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body        
        const userId = req.id

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({message: 'All fields are required', success: false})
        }
        const job = await Job.create({
            title,
            description,
            requirements : requirements.split(','),
            salary : Number(salary),
            location : location,
            jobType,
            experience,
            position,
            company : companyId,
            createdBy : userId,
        })

        return res.status(201).json({message: 'Job created successfully', success: true, job})
    }catch (error) {
        console.log("error in postJob",error.message);
        
    }
}


export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                // { requirements: { $regex: keyword, $options: 'i' } },
                // { position: { $regex: keyword, $options: 'i' } }
            ] 
        }
        const jobs = await Job.find(query).populate({path:"company", select:"name"})
        if(!jobs){
            return res.status(404).json({message: 'No jobs found', success: false})
        }
        return res.status(200).json({success: true, jobs})
    }catch(error){
        console.log(error.message);
        
    }
}




export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({message: 'Job not found', success: false})
        }
        return res.status(200).json({success: true, job})
    }catch(error){
        console.log(error.message);
        
    }
}

export const getAdminJob = async (req, res) => {
    try {
        console.log("req.id",req.id);
        
        const adminId = req.id
        const jobs = await Job.find({createdBy: adminId})
        console.log(jobs);
        
        if(!jobs){
            return res.status(404).json({message: 'No jobs found', success: false})
        }
        return res.status(200).json({success: true, jobs})
    }catch(error){
        console.log(error.message);
        
    }
}