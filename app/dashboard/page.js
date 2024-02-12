"use client"
import React, { useContext } from 'react';

import Overview from './components/overview/page';
import Applications from './student/application/page';
import Settings from './components/settings/page';
// import Profile from './components/profile/page';
import { AuthContext } from '../context/authcontext';
import MyInternship from './company/internship/page';
const Dashboard = () => {
 const {user}=useContext(AuthContext)

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
        <Overview userData={user.company.companyName} />
<MyInternship/>
</div>
    
    
  ):null) : null}
       
          <Settings />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
