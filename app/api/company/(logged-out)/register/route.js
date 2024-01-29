// import connectDB from "@/config/database";
// import Company from "@/models/Company";
import { NextResponse } from "next/server";

// export const config = {
//     api: {
//         bodyParser: false, // Disabling automatic body parsing
//     },
// };

export async function POST(request) {
    try {
        const formData = await request.formData();
        console.log(formData);

        // this will filter extract all the nonFileEntries from the file.
        const nonFilesEntries = Array.from(formData.entries()).filter(([name, value]) => !(value instanceof File));
        const { companyName, email, password, companyInfo, address, foundYear } = nonFilesEntries;
        // if (!companyName || email || password || companyInfo || address || foundYear || !files) {
        //     return NextResponse.json({ msg: "Missing Fields" }, { status: 400 });
        // }
        console.log(nonFilesEntries);

        const logo = formData.get('Logo');
        const registrationFile = formData.get('Registration');


        console.log(registrationFile);
        console.log(logo);



        // files.forEach(([name, file], index) => {
        //     const fileInfo = file;
        //     console.log(fileInfo);
        // });

        // we can validate file in this way
        // if(file.size>1000*1000){
        //     return NextResponse.json({msg:"File size limit exceeded"},{status:400});
        // }



        // await connectDB();
        // const body = await request.json();
        // console.log(body);
        // const { companyName, email } = await request.json();
        // const files = await request.files;
       
        // // const { catergory, industrySectors } = companyInfo;
        // // if (!catergory || !industrySectors) {
        // //     return NextResponse.json({ msg: "Missing Fields" }, { status: 400 });
        // // }
        // console.log(files)
        return NextResponse.json({ msg: "Success Upload" }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}