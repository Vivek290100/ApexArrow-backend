import { User } from "../models/userModel.js";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;
    console.log( fullName, email, password, phoneNumber, role);
    
    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const file = req.file
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

    const user = await User.findOne({ email});
    if (user) {
      return res 
        .status(400)
        .json({ message: "Email already exists", success: false });
    }

    const userByPhoneNumber = await User.findOne({ phoneNumber });
    if (userByPhoneNumber) {
      return res.status(400).json({ message: "Phone number already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    });
    return res.status(201).json({ message: "Account Created", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {

    // res.send("Welcome")
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    if (role !== user.role) {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
      // email: user.email,
      // role: user.role
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ message: `Welcome ${user.fullName}`, user, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("tokent", "", { maxAge: 0 })
      .json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {

  try {
      const { fullName, phoneNumber, email, bio, skills } = req.body;
      const file = req.file;
      console.log("Updating", req.body);
      console.log("file", file);
      
      // cloudinary
      const fileUri = getDataUri(file)
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content)


        
        let skillsArray;
        if(skills){
          skillsArray = skills.split(",");
        }
        const userId = req.id; //frm middleware
        // console.log("userId",userId);
        
    let user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    if(fullName)user.fullName = fullName
    if(email)user.email = email
    if(phoneNumber)user.phoneNumber = phoneNumber
    if(bio)user.profile.bio = bio
    if(skills)user.profile.skills = skillsArray
    // resume
    if(cloudResponse){
      user.profile.resume = cloudResponse.secure_url //cloudinaru url
      user.profile.resumeOriginalName = file.originalname //save original file name
    }

    // (user.fullName = fullName),
    //   (user.email = email),
    //   (user.phoneNumber = phoneNumber),
    //   (user.bio = bio),
    //   (user.profile.skills = skillsArray);


    await user.save();
    console.log("==1111===",user);
    

    user = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      };

      console.log("==2222===",user);


      return res.status(200).json({ message: "Profile updated", user, success: true });
  } catch (error) {
    console.log("error in update profile",error);
  }
};
