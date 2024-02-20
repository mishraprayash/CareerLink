"use client"
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faUsers, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import Overview from './components/overview/page';
import Settings from './components/settings/page';
import { AuthContext } from '@/app/context/authcontext';
import { InternshipContext } from '@/app/context/internshipcontext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { adminDashboardInfo } = useContext(InternshipContext);

  return (
    <div className="container mx-auto p-4 min-h-lvh">
      <div className="grid grid-cols-12 md:grid-cols-3 gap-4">
        <main className="col-span-9">
          {user && user.admin && (
            <div>
              <Overview userData={user?.admin.username} />
              {adminDashboardInfo && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-white rounded-md shadow-md p-4 flex flex-col justify-center items-center">
                    <FontAwesomeIcon icon={faUsers} className="text-2xl text-blue-500 mb-2 items-center" />
                    <h2 className="text-lg font-semibold mb-2">Students</h2>
                    <p>Total: {adminDashboardInfo.students.total}</p>
                    <p>
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> Approved: {adminDashboardInfo.students.approved}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-500" /> Pending: {adminDashboardInfo.students.pending}
                    </p>
                  </div>
                  <div className="bg-white rounded-md shadow-md p-4 flex flex-col justify-center items-center">
                    <FontAwesomeIcon icon={faBuilding} className="text-2xl text-blue-500 mb-2" />
                    <h2 className="text-lg font-semibold mb-2">Companies</h2>
                    <p>Total: {adminDashboardInfo.companies.total}</p>
                    <p>
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> Approved: {adminDashboardInfo.companies.approved}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-500" /> Pending: {adminDashboardInfo.companies.pending}
                    </p>
                  </div>
                  <div className="bg-white rounded-md shadow-md p-4 flex flex-col justify-center items-center">
                    <FontAwesomeIcon icon={faUser} className="text-2xl text-blue-500 mb-2" />
                    <h2 className="text-lg font-semibold mb-2">Admins</h2>
                    <p>Total: {adminDashboardInfo.admins.total}</p>
                    <p>
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> Active: {adminDashboardInfo.admins.active}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500" /> Inactive: {adminDashboardInfo.admins.inactive}
                    </p>
                  </div>
                </div>
              )}
              {/* <Settings /> */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
