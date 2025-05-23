import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User}from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async (req,res,)=>{
   //get user details from frontend
   //validation
   //check if user already exists:username or email
   //check for images,check for avatar
   //upload them to cloudinary,avatar
   //create user object-create entry in db
   //remove paddword and refresh token field from response
   //check for user creation
   //return res

   const {fullName,email,username,password}=req.body;
   console.log("email:",email);

   if(
    [fullName,email,username,password].some(()=>
    field?.trim()==="")
   ){
      throw new ApiError(400,"All fiels are required")
   }
   
   const existedUser=User.findOne({
      $or:[{ username },{ email }]
   })
   if(existedUser){
      throw new ApiError(409,"User with email or username already exists")
   }
   const avatarLocalPath= req.files?.avatar[0]?.path;
  const coverImageLocalPath= req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
   throw new ApiError(400,"Avatar file is required")
  }

  const avatar= await uploadOnCloudinary(avatarLocalPath)
  const coverImage=await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
   throw new ApiError(400,"Avatar file is required")
  }

 const user=await User.create({
   fullName,
   avatar:avatar.url,
   coverImage:coverImage?.url || "",
   email,
   password,
   username:username.toLowerCase()

  })
   const createuser=await User.findById(user._id).select(
      "-password -refreshToken"
   )
   if(!createuser){
      throw new ApiError(500,"Something went wrong while registring user")
   }
   return res.status(201).json(
      new ApiResponse(200,createdUser,"User registered successfully")
   )
})

export{
    registerUser,

}