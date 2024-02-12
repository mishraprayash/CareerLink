'use client'
import React, { useContext } from "react";
import { InternshipContext } from "@/app/context/internshipcontext";

function PendingAdmin() {
    const { pendingAdmin, loading ,acceptedStatus,accept,reject,rejectedStatus} = useContext(InternshipContext);
    console.log(pendingAdmin);
    return ( 
        <div>
             <div>Pending Admins</div>
             {
                acceptedStatus&&(window.alert(acceptedStatus))
            }
            {
                rejectedStatus&&(window.alert(rejectedStatus))
            }
             {pendingAdmin && pendingAdmin.map((admin) => (<div className="border border-blue-900 ">
                <div>
                <div class="p-4 bg-gray-200 rounded shadow-md">
          <div class="font-bold text-lg mb-2">Admin Profile</div>
          <div class="mb-2">Username: {admin.username}</div>
          <div>Email: {admin.email}</div>
        </div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button  onClick={()=>accept(admin._id,admin.role)}  className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-green-600">
                        Accept
                    </button>
                    <button   onClick={()=>reject(admin._id,admin.role)}  className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green active:bg-green-600">
                        Reject
                    </button>
                </div>

            </div>
            ))}
        </div>
     );
}

export default PendingAdmin;
