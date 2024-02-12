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
const savetolocal = async (files, id) => {


  const uploadPromises = files.map(async (file) => {
    try {
      const data = await file.arrayBuffer();
      const buffer = Buffer.from(data);
      // const id = uuidv4();
      const name = file.name.split('.')[0];
      const ext = file.type.split('/')[1];
      const uploadDir = path.join(
        'D:\\e-folder\\New Volume\\projects\\next.js\\CareerLink-Minor-project',
        'public',
        
        `${id}-${name}.${ext}`
      );

      // Await the writeFile call
      await fs.writeFile(uploadDir, buffer);
      return { filepath: uploadDir, filename: name, id: id }
    } catch (error) {
      console.error('Error processing file:', error);
    }
  });

  // Wait for all promises to resolve
  return await Promise.all(uploadPromises);
};

const saveonefiletolocal = async (file, id) => {
  try {
    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);
    const name = file.name.split('.')[0];
    const ext = file.type.split('/')[1];
    const uploadDir = path.join(
      'D:\\e-folder\\New Volume\\projects\\next.js\\career-backend',
      'public',
      `${id}-${name}.${ext}`
    );

    // Await the writeFile call
    await fs.writeFile(uploadDir, buffer);
    return { filepath: uploadDir, filename: name, id: id };
  } catch (error) {
    console.error('Error processing file:', error);
    return []; // or handle the error appropriately
  }
};


const uploadtoCloudinary = async (files) => {
  const multiplefilePromise = files.map((file) => {
    return cloudinary.uploader.upload(file.filepath, { folder: `Careerlink/${file.id}` });
  });
  return await Promise.all(multiplefilePromise);
}

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
   if(!session){
    return NextResponse.json({
      msg: "You must be signed in to view the protected content on this page.",
    },{status:401})
  }
  const studentEmail=session.user.email;
    await connectDB()


    const formData = await request.formData()
    console.log(formData)
    const nonFileEntries = Array.from(formData.entries())
      .filter(([key, value]) => !(value instanceof File));

    // Destructure the non-file entries
    const nonFileData = Object.fromEntries(nonFileEntries);
    // console.log(nonFileData)
    const { name, gender, age, about, bio, state, district, street, } = nonFileData
    if (!name || !gender || !age || !about || !bio || !state||!district||!street) {
      return NextResponse.json({ msg: "Missing Fields" }, { status: 400 });
  }

    const student = await Student.findOneAndUpdate(
      { email:studentEmail },
      {
        name,
        gender,
        age,
        about,
        bio,
        address: {
          state,
          district,
          street,
        },
        profileStatus:"Updated"
      },
      { new: true, runValidators: true }
    );
if(!student){
  return NextResponse.json({
    msg: "email not found"
  }, { status: 400 });
}
    const socialmedias = formData.getAll('socialmedia');
    for (const socialmediaString of socialmedias) {
      // Parse the JSON string into an array of objects
      const socialmediaArray = JSON.parse(socialmediaString);
    
      // Assuming student.socialmedia is an array, you can push each entry
      for (const socialmedia of socialmediaArray) {
        student.socialmedia.push(socialmedia);
      }
    
      // Save the updated student
      await student.save();
    }
    const id = student._id
    console.log(id)
    const profile = formData.get('profilePicture')
    const cvfile = formData.get('cv')
    const certificatesfile = formData.getAll('certificates')

// size limit 
//for profile
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

// for cv
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
// for certificates
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
    //save to local
    // const profilePath = await saveonefiletolocal(profile, id)
    // const cvPath = await saveonefiletolocal(cvfile, id)
    // const certificatesPath = await savetolocal(certificatesfile, id)

    //upload to cloudinary
    const profileUpload = await uploadToCloudinary(profile,id)
    const cvupload = await uploadToCloudinary(cvfile,id)
    
const uploadCertificates = async (files, id) => {
  const uploadPromises = files.map(async (file) => {
    const result = await uploadToCloudinary(file, id);
    return result;
  });

  return Promise.all(uploadPromises);
};

const certificatesUpload = await uploadCertificates(certificatesfile, id);
    // const certificatesUpload = await uploadtoCloudinary(certificatesPath,id)

    // //delete file
    // fs.unlink(profilePath.filepath)
    // fs.unlink(cvPath.filepath)
    // certificatesPath.map(file => fs.unlink(file.filepath))

    // //update student schema

    const profilePicture = {}
    profilePicture.public_id = profileUpload.public_id;
    profilePicture.secure_url = profileUpload.secure_url


    const cv = {}
    cv.public_id = cvupload.public_id;
    cv.secure_url = cvupload.secure_url


    const certificates = certificatesUpload.map(certificate => {
      return { public_id: certificate.public_id, secure_url: certificate.secure_url }
    })
    console.log(certificates)
    const updatedStudent = await Student.findOneAndUpdate({ _id: id }, { profilePicture, cv, certificates })
    await updatedStudent.save()
   
    const st = await Student.find({ _id: id })
    console.log(st)
    return NextResponse.json({
      msg: 'Student profile updated successfully', student: st
    }, { status: 200 });
  } catch (err) {
    console.log(err)
    return NextResponse.json({
      msg: err
    }, { status: 400 });
  }

}