"use client";
import React, { useContext} from "react";
import Link from "next/link";
import Overview from "./components/overview/page";
import Applications from "./student/application/page";
import { AuthContext } from "../context/authcontext";
import MyInternship from "./company/internship/page";
import { ToastMessage } from "../components/ToastMessage";
import { getReq } from "../hooks/service";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const handleEmailVerify = async (e) => {
    e.preventDefault();
    const response = await getReq("/api/company/sendverificationlink");
    if (!response.ok) {
      ToastMessage("Error", response.msg);
    } else {
      ToastMessage("Success", "Verification Link send successfully!");
    }
  };
  return (
    <div className="container mx-auto p-4 min-h-lvh">
      <div className="grid grid-cols-12 md:grid-cols-3 gap-4">
          <main className="col-span-9">
          {user ? (
            user.student ? (
              <div>
                <Overview userData={user?.student.name} />
                <Applications />
              </div>
            ) : user.company ? (
              <div>
                {!user.company?.verified ? (
                  <>
                    {/* {ToastMessage("Warning", "Please verify your email to create an internship.")} */}
                    <div
                      className="bg-yellow-100 border border-yellow-300 text-yellow-900 px-4 py-3 rounded relative mt-4 flex items-center justify-between"
                      role="alert"
                    >
                      <span className="block sm:inline">
                        Please verify your email to create an internship.
                      </span>
                      <button
                        className="bg-yellow-200 hover:bg-yellow-400 text-yellow-900 font-bold py-2 px-4 rounded"
                        onClick={handleEmailVerify}
                      >
                        Verify
                      </button>
                    </div>
                  </>
                ) : null}

                {user.company?.registrationFile ? null : (
                  <>
                    {/* {ToastMessage("Warning", "Please update your profile to create an internship, which will be verified by the admin.")} */}
                    <div
                      className="bg-yellow-100 border border-yellow-300 text-yellow-900 px-4 py-3 rounded relative mt-4 flex items-center justify-between"
                      role="alert"
                    >
                      <span className="block sm:inline">
                        Please update your profile to create an internship,which will be verified by the admin.
                      </span>
                      <div className="flex items-center">
                        <Link
                          href="/dashboard/company/updateprofile"
                          className="text-yellow-900 hover:text-yellow-700 mr-2"
                        >
                          <button className="bg-yellow-200 hover:bg-yellow-400 text-yellow-900 font-bold py-2 px-4 rounded">
                            Update
                          </button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
                <Overview userData={user.company.companyName} />
                <MyInternship />
              </div>
            ) : null
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
