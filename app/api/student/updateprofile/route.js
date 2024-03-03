
import { getServerSession } from "next-auth/next"
import { handleAuth } from "../../auth/[...nextauth]/route";

import path from 'path'
import fs from "fs/promises"
import Student from "@/models/Student";
import { NextResponse } from "next/server";
import connectDB from "@/config/dbconfig/database";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_APIKEY,
    api_secret: process.env.CLOUD_SECRET
  });
  
const uploadToCloudinary = async (file,id) => {
    try {
      const arrayBuffer=await file.arrayBuffer()
      const buffer=new Uint8Array(arrayBuffer)
      console.log(buffer,id)
   const result=   await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({
          folder: `Careerlink/Student/${id}`,
        },function(error,result){
          if(error){
            reject(error)
            return;
          }
          resolve(result)
        }).end(buffer)
      })
      return result;
    } catch (error) {
      // Handle error appropriately (e.g., log or throw)
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };
export async function POST(request) {
    try {
      const session = await getServerSession(handleAuth)
      if (!session) {
        return NextResponse.json({
          msg: "You must be signed in to view the protected content on this page.",
        }, { status: 401 })
      }
      const studentEmail = session.user.email;
      await connectDB()
  
      const formData = await request.formData();
      // Check if the form data contains specific fields
      const hasGeneralInfo = formData.get('name')!='' && formData.get('gender')!='' && formData.get('age')!=null && formData.get('about')!='' && formData.get('bio')!='' && formData.get('state')!="" && formData.get('district')!='' && formData.get('street')!='';
      const hasProfilePicture = formData.get('profilePicture')instanceof File;
      const hasCV = formData.get('cv')instanceof File;
      const hasCertificates = formData.has('certificates');
      const hasSocialMedia = JSON.parse(formData.get('socialmedia')).some(item => item.link !== '');
  // console.log(hasGeneralInfo,hasProfilePicture,hasCV,hasCertificates,hasSocialMedia)
      if (!hasGeneralInfo && !hasProfilePicture && !hasCV && !hasCertificates && !hasSocialMedia) {
        return NextResponse.json({ msg: "No data provided for update" }, { status: 400 });
      }
      // Update general information if provided
      if (hasGeneralInfo) {
        const nonFileEntries = Array.from(formData.entries())
        const { name, gender, age, about, bio, state, district, street } = Object.fromEntries(nonFileEntries);
        // Check for missing fields
        if (!name || !gender || !age || !about || !bio || !state || !district || !street) {
          return NextResponse.json({ msg: "Missing Fields for general information" }, { status: 400 });
        }
  
        const student = await Student.findOneAndUpdate(
          { email: studentEmail },
          {
            name,
            gender,
            age,
            about,
            bio,
            address: { state, district, street },
          },
          { new: true, runValidators: true }
        );
  
        if (!student) {
          return NextResponse.json({ msg: "Email not found" }, { status: 400 });
        }
      }
      const student = await Student.findOne({ email: studentEmail });
      // Update profile picture if provided
      if (hasProfilePicture) {
        // Upload profile picture
        const profile = formData.get('profilePicture')
        if(!profile.type.startsWith('image')){
            return NextResponse.json({
                msg:"Please Upload Image"
              }, { status: 400 });
          }
          if(profile.size>200*1024){
            return NextResponse.json({
                msg:"Please upload image smaller 100kb"
              }, { status: 400 });
          }
        const profileUpload = await uploadToCloudinary(profile, student._id);
        // Update student schema with profile picture
        const profilePicture = {
          public_id: profileUpload.public_id,
          secure_url: profileUpload.secure_url
        };
        
        await Student.findOneAndUpdate({ _id: student._id }, { profilePicture });
      }
  
      // Update CV if provided
      if (hasCV) {
        const cvfile = formData.get('cv')
        if(!cvfile.type.startsWith('application')){
            return NextResponse.json({
                msg:"Please Upload Pdf file"
              }, { status: 400 });
          }
          if(cvfile.size>500*1024){
            return NextResponse.json({
                msg:"Please upload pdf smaller 500kb"
              }, { status: 400 });
          }
        // Upload CV

        const cvUpload = await uploadToCloudinary(cvfile, student._id);
        // Update student schema with CV
        const cv = {
          public_id: cvUpload.public_id,
          secure_url: cvUpload.secure_url
        };
        await Student.findOneAndUpdate({ _id: student._id }, { cv });
      }
  
      // Update certificates if provided
      if (hasCertificates) {
        const certificatesfile = formData.getAll('certificates')
        certificatesfile.map(certificate =>{
            if(!certificate.type.startsWith('image')){
              return NextResponse.json({
                  msg:"Please Upload Image"
                }, { status: 400 });
          }
          if(certificate.size>500*1024){
              return NextResponse.json({
                  msg:"Please upload image smaller 100kb"
                }, { status: 400 });
          }
          
          })
        // Upload certificates
        const uploadCertificates = async (files, id) => {
            const uploadPromises = files.map(async (file) => {
              const result = await uploadToCloudinary(file, id);
              return result;
            });
          
            return Promise.all(uploadPromises);
          };
          const certificatesUpload = await uploadCertificates(certificatesfile, student._id);
        // Update student schema with certificates
        const certificates = certificatesUpload.map(certificate => ({
          public_id: certificate.public_id,
          secure_url: certificate.secure_url
        }));
        await Student.findOneAndUpdate({ _id: student._id },  { $push: { certificates }});
      }
  
      // Update social media if provided
      if (hasSocialMedia) {
        // Clear existing social media entries
        await Student.findOneAndUpdate({ _id: student._id }, { socialmedia: [] });
        // Parse and update social media
        const socialmedias = formData.getAll('socialmedia');
        for (const socialmediaString of socialmedias) {
          const socialmediaArray = JSON.parse(socialmediaString);
          for (const socialmedia of socialmediaArray) {
            await Student.findOneAndUpdate({ _id: student._id }, { $push: { socialmedia } });
          }
        }
      }
    const isProfileComplete = Object.keys(student.toObject()).every(field => {
      // Exclude non-relevant fields or fields with default values if any
      return student[field] !== undefined && student[field] !== null && student[field] !== "";
    });

    // Update profile status if all fields are filled
    if (isProfileComplete) {
      await Student.findOneAndUpdate({ _id: student._id }, { profileStatus: "Complete" });
    }
      // Fetch updated student information
      const updatedStudent = await Student.findById(student._id);
      return NextResponse.json({ msg: 'Student profile updated successfully', student: updatedStudent }, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ msg: "An error occurred while updating student profile" }, { status: 400 });
    }
  }
  