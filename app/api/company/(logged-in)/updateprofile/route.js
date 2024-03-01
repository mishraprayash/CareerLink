import connectDB from "@/config/dbconfig/database";
import Company from "@/models/Company";
import { NextResponse } from "next/server"
import { decodeJWTCompany } from "@/helpers/validateToken";
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
        folder: `Careerlink/Company/${id}`,
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

export async function PATCH(request){
 try {
    
    const decodedToken =await decodeJWTCompany(request);
    if (!decodedToken) {
        return NextResponse.json({ msg: "Token Validation Error--login error--" }, { status: 400 });
    }
    await connectDB()
    const formData = await request.formData()
    console.log(formData)
    const nonFileEntries = Array.from(formData.entries())
      .filter(([key, value]) => !(value instanceof File));

    // Destructure the non-file entries
    const nonFileData = Object.fromEntries(nonFileEntries);
    // console.log(nonFileData)
    const {companyInfo,city,state,zipCode,foundYear,companyDescription,phoneNO,category,industrySectors} = nonFileData
    if (!category || !industrySectors || !city || !state||!zipCode ||!foundYear || !companyDescription || !phoneNO) {
      return NextResponse.json({ msg: "Missing Fields" }, { status: 400 });
  }
  const company = await Company.findOneAndUpdate(
    { _id:decodedToken.id },
    {
        companyInfo:{
          category,
          industrySectors
        },
        foundYear,
        description:companyDescription,
        phoneNO,
      address: {
        city,
        state,
        zipCode,
      },
    },
    { new: true, runValidators: true }
  );
if(!company){
return NextResponse.json({
  msg: "email not found"
}, { status: 400 });
}   
const companyLogo = formData.get('logo')
const registrationFile = formData.get('registrationFile')

//for logo
if(!companyLogo.type.startsWith('image')){
    return NextResponse.json({
        msg:"Please Upload Image"
      }, { status: 400 });
  }
  if(companyLogo.size>50*1024){
    return NextResponse.json({
        msg:"Please upload image smaller 100kb"
      }, { status: 400 });
  }
  
  // for registrationfile
  if(!registrationFile.type.startsWith('application')){
    return NextResponse.json({
        msg:"Please Upload Pdf file"
      }, { status: 400 });
  }
  if(registrationFile.size>500*1024){
    return NextResponse.json({
        msg:"Please upload pdf smaller 500kb"
      }, { status: 400 });
  }
  const companyLogoUpload=await uploadToCloudinary(companyLogo,company._id)
const registrationFileUpload= await uploadToCloudinary(registrationFile,company._id)

const logoFinal = {}
logoFinal.public_id = companyLogoUpload.public_id;
logoFinal.secure_url = companyLogoUpload.secure_url


const registrationFileFinal = {}
registrationFileFinal.public_id = registrationFileUpload.public_id;
registrationFileFinal.secure_url = registrationFileUpload.secure_url


const updatedCompany = await Company.findOneAndUpdate({ _id:decodedToken.id }, { logo:logoFinal, registrationFile:registrationFileFinal})
await updatedCompany.save()
 
    return NextResponse.json({
        msg: 'Company profile updated successfully', company:updatedCompany
      }, { status: 200 });
    } catch (err) {
      console.log(err)
      return NextResponse.json({
        msg: "internal server error",error:err
      }, { status: 400 });
    }
}