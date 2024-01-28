
import { NextResponse } from "next/server";
import connectDB from '@/config/database';
import Company from "@/models/Company";
import { decodeJWTCompany } from "@/helpers/validateCompanyToken";
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
    const {companyInfo,city,state,zipCode,foundYear,companyDescription,phoneNO} = nonFileData
    if (!companyInfo || !city || !state||!zipCode ||!foundYear || !companyDescription || !phoneNO) {
      return NextResponse.json({ msg: "Missing Fields" }, { status: 400 });
  }
  const company = await Company.findOneAndUpdate(
    { _id:decodedToken.id },
    {
        companyInfo,
        foundYear,
        companyDescription,
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
//buffer
const logobytes = await companyLogo.arrayBuffer()
const logoBuffer = Buffer.from(logobytes)
//cv
const registrationbytes = await registrationFile.arrayBuffer()
const registrationBuffer = Buffer.from(registrationbytes)


const updatedCompany = await Company.findOneAndUpdate({ _id:decodedToken.id }, { logo:logoBuffer, registrationFile:registrationBuffer})
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