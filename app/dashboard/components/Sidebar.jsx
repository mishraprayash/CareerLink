"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faUser,
  faCog,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authcontext";
const Sidebar = () => {
  const { user } = useContext(AuthContext);
  return (
    <aside className="bg-gray-200 px-6 sticky left-0 h-full">
      <ul className="space-y-4 ">
        <li className="h-28 hover:bg-gray-300 p-6 rounded">
          <Link href="/dashboard" passHref>
            <p className="flex flex-col">
              <FontAwesomeIcon
                icon={faHome}
                style={{
                  fontSize: "10px",
                  marginRight: "0.5rem",
                  height: "50px",
                }}
              />{" "}
              Dashboard
            </p>
          </Link>
        </li>
        <li className="h-28 hover:bg-gray-300 p-6 rounded">
          <Link href="/dashboard/components/profile" passHref>
            <p className="flex flex-col">
              <FontAwesomeIcon
                icon={faUser}
                style={{
                  fontSize: "3rem",
                  marginRight: "0.5rem",
                  height: "50px",
                }}
              />{" "}
              Profile
            </p>
          </Link>
        </li>
        {user ? (
          user.student ? (
            <div>
              <li className="h-28 hover:bg-gray-300 p-6 rounded">
                <Link href="/dashboard/student/updateprofile" passHref>
                  <p className="flex flex-col">
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      style={{
                        fontSize: "1rem",
                        marginRight: "0.5rem",
                        height: "50px",
                      }}
                    />{" "}
                    UpdateProfile
                  </p>
                </Link>
              </li>
              <li className="h-28 hover:bg-gray-300 p-6 rounded">
                <Link href="/dashboard/student/application" passHref>
                  <p className="flex flex-col">
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      style={{
                        fontSize: "1rem",
                        marginRight: "0.5rem",
                        height: "50px",
                      }}
                    />{" "}
                    Applications
                  </p>
                </Link>
              </li>
            </div>
          ) : user.company ? (
            <div>
              <li className="h-28 hover:bg-gray-300 p-6 rounded">
                {/* Add your Link or other content for company here */}
                <Link href="/dashboard/company/internship" passHref>
                  <p className="flex flex-col">
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      style={{
                        fontSize: "1rem",
                        marginRight: "0.5rem",
                        height: "50px",
                      }}
                    />{" "}
                    My Internships
                  </p>
                </Link>
              </li>

              <li className="h-28 hover:bg-gray-300 p-6 rounded">
                <Link href="/dashboard/company/createinternship" passHref>
                  <p className="flex flex-col">
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      style={{
                        fontSize: "1rem",
                        marginRight: "0.5rem",
                        height: "50px",
                      }}
                    />{" "}
                    Create Internship
                  </p>
                </Link>
              </li>

              <li className="h-28 hover:bg-gray-300 p-6 rounded">
                <Link href="/dashboard/company/updateprofile" passHref>
                  <p className="flex flex-col">
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      style={{
                        fontSize: "1rem",
                        marginRight: "0.5rem",
                        height: "50px",
                      }}
                    />{" "}
                    UpdateProfile
                  </p>
                </Link>
              </li>
            </div>
          ) : null
        ) : null}

        <li className="h-28 hover:bg-gray-300 p-6 rounded">
          <Link href="/dashboard/components/settings" passHref>
            <p className="flex flex-col">
              <FontAwesomeIcon
                icon={faCog}
                style={{
                  fontSize: "1rem",
                  marginRight: "0.5rem",
                  height: "50px",
                }}
              />{" "}
              Settings
            </p>
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
