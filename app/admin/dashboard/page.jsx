"use client"
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faUsers, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import Overview from './components/overview/page';
import { AuthContext } from '@/app/context/authcontext';
import { InternshipContext } from '@/app/context/internshipcontext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { adminDashboardInfo } = useContext(InternshipContext);

  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-12 md:grid-cols-3 gap-4">
        <main className="col-span-9">
          {user && user.admin && (
            <div>
              <Overview userData={user?.admin.username} />
              {adminDashboardInfo? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {Object.keys(adminDashboardInfo).map((key) => (
                    <div key={key} className="bg-white rounded-md shadow-md p-4 flex flex-col justify-center items-center">
                      <FontAwesomeIcon icon={key === 'students' ? faUsers : key === 'companies' ? faBuilding : faUser} className="text-3xl text-[#108A00] mb-2" />
                      <h2 className="text-2xl font-semibold mb-2 capitalize font-mono">{key}</h2>
                      <p>Total: {adminDashboardInfo[key].total}</p>
                      <p>
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> Approved: {key==='admins'?adminDashboardInfo[key].active:adminDashboardInfo[key].approved}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faExclamationCircle} className={key === 'admins' ? 'text-red-500' : 'text-yellow-500'} /> {key === 'admins' ? 'Inactive' : 'Pending'}: {key==='admins'?adminDashboardInfo[key].inactive:adminDashboardInfo[key].pending}
                      </p>
                    </div>
                  ))}
                </div>
              ):(
                <div className="text-center font-semibold m-5 p-5 text-[1.2rem]">Loading......</div>
              )
            }
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
