import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";

export const applyForJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job ID is required", success: false });
    }
    let applied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (applied) {
      return res
        .status(400)
        .json({
          message: "You have already applied for this job",
          success: false,
        });
    }

    // check if the jobs exists
    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({
            message: "Job not found",
            success: false
        })
    }

    // create
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res
      .status(201)
      .json({ message: "Application submitted successfully", success: true });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAppliedjobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .populate({ 
        path: "job", 
        options: { sort: { createdAt: -1}},
        populate: {
            path:"company",
            options: { sort: { createdAt:-1}},
        }
    });
    if(!applications){
        return res.status(404).json({message: 'No applications found', success: false})
    }
    return res.status(200).json({success: true, applications})
  } catch (error) {
    console.log(error.message);
  }
};



export const getJobApplicants = async (req, res) => {
    try {
      const jobId = req.params.id;
      // console.log("///", jobId);
      
      const job = await Job.findById(jobId).populate({
        path:"applications",
        // options: { sort: { createdAt: -1}},
        populate: {
          path:"applicant",
      }
    });
    if(!job){
        return res.status(404).json({message: 'Job not found', success: false})
    }
    const applications = job.applications; 
    // console.log("applications",applications);
    
      if(!applications){
        return res.status(404).json({message: 'No applications found', success: false})
      }
      return res.status(200).json({success: true, applications})
    }catch(error){
        console.log(error.message);
    }
}

export const updateStatus = async (req, res) => {
  try {
    const userId = req.id;
    const applicationId = req.params.id;
    const { status } = req.body;
    if(!status){
      return res
       .status(400)
       .json({ message: "Status is required", success: false });
    }
    const application = await Application.findOne({_id:applicationId});
    if(!application){
      return res
       .status(404)
       .json({ message: "Application not found", success: false });
    }

    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({message:"status updated successfully",success: true, application});
  }catch(error){
    console.log(error.message);
  }
}