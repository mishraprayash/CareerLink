import multer from 'multer'
import { NextResponse } from 'next/server';
import Student from '@/models/Student';
import { connectToDB } from '@/utils/connecttodb';
<<<<<<< HEAD
=======

>>>>>>> bibek
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export const middleware = upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'certificates', maxCount: 10 }, // Adjust maxCount as needed
]);


export async function POST(request) {
  try {
    await connectToDB();
    const formData = await request.formData()
    const nonFileEntries = Array.from(formData.entries())
      .filter(([key, value]) => !(value instanceof File));

    // Destructure the non-file entries
    const nonFileData = Object.fromEntries(nonFileEntries);
    console.log(nonFileData)
    const { email, gender, age, about, bio, state, district, street, } = nonFileData

    const profile = formData.get('profilePicture')
    // Convert the file to a Buffer
    const bytes = await profile.arrayBuffer()
    const profilebuffer = Buffer.from(bytes)
    console.log(profilebuffer)



    if (!profile.type.startsWith('image')) {
      throw new BadRequestError('Please Upload Image');
    }
    if (profile.size > 500 * 1024) {
      throw new Error('Please upload image smaller 1MB');
    }


    const cvupload = formData.get('cv')
    const cvbytes = await cvupload.arrayBuffer()
    const cvbuffer = Buffer.from(cvbytes)
    console.log(cvbuffer)



    // Update the existing student profile or create a new one
    const student = await Student.findOneAndUpdate(
      { email },
      {
        gender,
        age,
        about,
        bio,
        address: {
          state,
          district,
          street,
        },
        profilePicture: profilebuffer,
        cv: cvbuffer

      },
      { new: true, runValidators: true }
    );
    // console.log('Student Profile Updated:', student);

    const certificates = formData.getAll('certificates');


    for (const file of certificates) {
      console.log(file)
      try {
        const certificateBytes = await file.arrayBuffer();
        const certificateBuffer = Buffer.from(certificateBytes);

        const certificate = {
          data: certificateBuffer,
          category: file.type,
        };

        student.certificates.push(certificate);

        await student.save();  

      } catch (error) {
        console.error('Error processing certificate:', error);
        // Handle the error as needed
      }
    }
    const socialmedias = formData.getAll('socialmedia');
    for(const socialmedia of socialmedias ){
      student.socialmedia.push(socialmedia)
      await student.save()
    }



    return NextResponse.json({
      msg: 'Student profile updated successfully',
      // student,
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: 'Internal Server Error',
    }, { status: 500 });
  }
}
