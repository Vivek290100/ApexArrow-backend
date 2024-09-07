import {Company} from '../models/companyModel.js'

export const registerCompany = async (req,res) => {
    console.log("req.body",req.body);
    
    try {
        const {companyName} = req.body
        if(!companyName || typeof companyName !== 'string'){
            return res.status(400).json({message: 'Company name is required',success: false})
        }
        let company = await Company.findOne({name: companyName})
        if(company){
            return res.status(400).json({message: 'Company already exists', success: false})
        }
        company = await Company.create({
            name: companyName,
            userId: req.id,
        })

        return res.status(201).json({message: "company registered",success: true, company})
    }catch(error) {
        console.log("err in companyregister", error.message);
    }
}


export const getCompany = async (req, res) => {
    
    try {
        const userId = req.id
        const companies = await Company.find({userId})
        
        if(!companies){
            return res.status(404).json({message: 'Companies not found', success: false})
        }
        return res.status(200).json({success: true, companies})
    } catch(error) {
        console.log(error)
    }
}


export const getCompanyById = async (req,res) =>{
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(404).json({message: 'Company not found', success: false})
        }
        return res.status(200).json({success: true, company})
    } catch(error) {
        console.log(error)
    }
}

export const updateCompany = async (req,res) =>{
    try {
        const {name, description,website, location} = req.body
        const file = req.file
        //cloudinary

        const updateData = {name, description,website, location}

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true})

        if(!company){
            return res.status(404).json({message: 'Company not found', success: false})
        }

        return res.status(200).json({message:"company informations updated",success: true, company})
    } catch(error) {
        console.log(error)
    }
}