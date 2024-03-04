"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faClipboardList,
  faUsers,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authcontext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <>
      {user ? (
        user.admin ? (
          <aside className="bg-gray-200 sticky left-0">
            <ul className="space-y-4">
              {" "}
              {/* Increased space-y value for more vertical spacing */}
              <SidebarLink
                href="/admin/dashboard"
                icon={faHome}
                label="Dashboard"
              />
              <SidebarLink
                href="/admin/dashboard/components/profile"
                icon={faUser}
                label="Profile"
              />
              <SidebarLink
                href="/admin/dashboard/components/pendinginternship"
                icon={faClipboardList}
                label="Pending Internships"
              />
              <SidebarLink
                href="/admin/dashboard/components/pendingadmin"
                icon={faUsers}
                label="Pending Admins"
              />
              <SidebarLink
                href="/admin/dashboard/components/pendingcompany"
                icon={faUsers}
                label="Pending Companies"
              />
              <SidebarLink
                href="/admin/dashboard/components/settings"
                icon={faCog}
                label="Settings"
              />
            </ul>
          </aside>
        ) : (
          <div>Only admin can access this page.</div>
        )
      ) : (
        <div className="h-[90vh] relative left-[45vw] top-[45vh]">
          <p className="font-semibold text-[1.5rem]">Loading.....</p>
        </div>
      )}
    </>
  );
};

const SidebarLink = ({ href, icon, label }) => {
  return (
    <li className="h-28 hover:bg-gray-300 p-5 rounded">
      <Link href={href} passHref>
        <p className="flex flex-col">
          <FontAwesomeIcon
            icon={icon}
            style={{ fontSize: "10px", marginRight: "0.5rem", height: "50px" }}
          />{" "}
          {label}
        </p>
      </Link>
    </li>
  );
};

export default Sidebar;
