'use client'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faClipboardList, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '@/app/context/authcontext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <aside className="bg-gray-200 py-4 px-6">
      <ul className="space-y-6"> {/* Increased space-y value for more vertical spacing */}
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
    <li className='my-2'>
      <Link href={href} passHref>
        <p className="flex items-center cursor-pointer hover:text-blue-500">
          <FontAwesomeIcon icon={icon} style={{ fontSize: '1rem', marginRight: '0.5rem', height: '20px' }} />
          {label}
        </p>
      </Link>
    </li>
  );
};

export default Sidebar;
