'use client'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faClipboardList, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '@/app/context/authcontext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <aside className="bg-gray-200 py-16 px-6 mt-14 sticky left-0 top-16">
      <ul className="space-y-4"> {/* Increased space-y value for more vertical spacing */}
        {user ? (
          user.admin ? (
            <div className='my-2'>
              <SidebarLink href="/admin/dashboard" icon={faTachometerAlt} label="Dashboard" />
              <SidebarLink href="/admin/dashboard/components/profile" icon={faUser} label="Profile" />
              {/* <SidebarLink href="/admin/dashboard/components/overview" icon={faBriefcase} label="Overview" /> */}
              <SidebarLink href="/admin/dashboard/components/pendinginternship" icon={faClipboardList} label="Pending Internships" />
              <SidebarLink href="/admin/dashboard/components/pendingadmin" icon={faUsers} label="Pending Admins" />
              <SidebarLink href="/admin/dashboard/components/pendingcompany" icon={faUsers} label="Pending Companies" />
              <SidebarLink href="/admin/dashboard/components/settings" icon={faCog} label="Settings" />
            </div>
          ) : (
            <div>Only admin can access this page.</div>
          )
        ) : (
          <div>Login required.</div>
        )}
      </ul>
    </aside>
  );
};

const SidebarLink = ({ href, icon, label }) => {
  return (
    <li className='h-28 hover:bg-gray-300 p-5 rounded'>
      <Link href={href} passHref>
        <p className="flex flex-col">
          <FontAwesomeIcon icon={icon} style={{ fontSize: '1rem', marginRight: '0.5rem', height: '50px' }} />
          <p className='text-2xl font-mono'>

          {label}
          </p>
        </p>
      </Link>
    </li>
  );
};

export default Sidebar;
