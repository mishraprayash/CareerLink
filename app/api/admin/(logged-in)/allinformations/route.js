
import connectDB from "@/config/dbconfig/database";
import { NextResponse } from "next/server";
import { decodeJWTAdmin} from "@/helpers/validateToken";
import Admin from "@/models/Admin";
import Student from "@/models/Student";
import Company from "@/models/Company";

export async function GET(request) {
    try {
        await connectDB();
        const decodedToken =await decodeJWTAdmin(request);
        if (!decodedToken) {
            return NextResponse.json({ msg: "Token Validation Error" }, { status: 400 });
        }
        const admin = await Admin.findOne({ _id: decodedToken.id});
        if (!admin) {
            return NextResponse.json({ msg: "Admin does not exist:" }, { status: 404 });
        }
        const totalStudents = await Student.countDocuments();
    // Count number of students with status 'Approved' and 'Pending'
    const approvedStudents = await Student.countDocuments({ state: 'Approved' });
    const pendingStudents = await Student.countDocuments({ state: 'Pending' });

    // Count total number of companies
    const totalCompanies = await Company.countDocuments();
    // Count number of companies with status 'Approved' and 'Pending'
    const approvedCompanies = await Company.countDocuments({ state: 'Approved' });
    const pendingCompanies = await Company.countDocuments({ state: 'Pending' });

    // Count total number of admins
    const totalAdmins = await Admin.countDocuments();
    // Count number of admins with status 'Active' and 'Inactive'
    const approvedAdmins = await Admin.countDocuments({ state: 'Approved' });
    const pendingAdmins = await Admin.countDocuments({ state: 'Pending' });

    // Prepare response data
    const dashboardInfo = {
      students: {
        total: totalStudents,
        approved: approvedStudents,
        pending: pendingStudents,
      },
      companies: {
        total: totalCompanies,
        approved: approvedCompanies,
        pending: pendingCompanies,
      },
      admins: {
        total: totalAdmins,
        active: approvedAdmins,
        inactive: pendingAdmins,
      },
    };

        return NextResponse.json({ msg: "General Informations",dashboardInfo  }, { status: 200 });
    } catch (error) {
        console.log('Error occured while fetching current internships');
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}