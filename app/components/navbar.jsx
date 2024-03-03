"use client"
import Link from "next/link";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { AuthContext } from "../context/authcontext";
import AppHeaderDropdown from "./AppHeaderDropdown";

const Navbar = () => {
  const { data: session } = useSession();
  const { user, logoutUser } = useContext(AuthContext);
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [profileUrl, setProfileUrl] = useState(null);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();

      if (response && response.error) {
        console.error("Error fetching providers:", response.error);
      } else {
        setProviders(response);
      }
    };
    setProvider();
  }, []);

  const StudentImageUrl = user?.student?.profilePicture
    ? user.student.profilePicture.secure_url
    : session?.user.image;

  const CompanyImageUrl = user?.company?.logo
    ? user.company.logo.secure_url
    : "/Image/Companylogo.jpg";

  useEffect(() => {
    setProfileUrl(user?.student ? StudentImageUrl : CompanyImageUrl);
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row md:justify-around bg-[#DBE7C9]">
      <div className="flex justify-between items-center w-full md:w-1/3 px-4 md:py-0">
        <div className="flex items-center">
          <Link className="no-underline px-3 ml-5" href="/">
            <Image
              src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/pvqct2blfs7ntb4hdtmt"
              width={40}
              height={40}
              alt="logo"
              className="  rounded-full"
            />
          </Link>
          <Link href="/">
            <span className="font-bold text-[#108A00] text-2xl py-3">
              CareerLink
            </span>
          </Link>
        </div>
        <button
          onClick={() => setToggleDropdown(!toggleDropdown)}
          className="md:hidden focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {toggleDropdown && (
        <div className="md:hidden px-4 py-2 w-full">
          <div className="flex flex-col gap-2">
            <Link href="/explore">
              <button className="navbutton bg-white rounded-lg px-3 py-1">
                EXPLORE
              </button>
            </Link>
            <Link href="/">
              <button className="navbutton bg-white rounded-lg px-3 py-1">
                HOME
              </button>
            </Link>
            <Link href={user?.admin ? "/admin/dashboard" : "/dashboard"}>
              <button className="navbutton bg-white rounded-lg px-3 py-1">
                DASHBOARD
              </button>
            </Link>
            <Link href="/careerguide">
              <button className="navbutton bg-white rounded-lg px-3 py-1">
                CAREER GUIDE
              </button>
            </Link>
            <AppHeaderDropdown imgUrl={profileUrl} logoutUser={logoutUser} />
          </div>
        </div>
      )}
      <div className="hidden md:flex items-center p-5 w-full md:w-2/3 justify-end">
        {user ? (
          <div className="flex gap-5 items-center">
            <Link href="/explore">
              <button className="navbutton bg-white rounded-lg px-3 py-1">
                EXPLORE
              </button>
            </Link>
            <Link href="/">
              <button className="navbutton bg-white rounded-lg px-3 py-1">
                HOME
              </button>
            </Link>
            <Link href={user?.admin ? "/admin/dashboard" : "/dashboard"}>
              <button className="navbutton bg-white rounded-lg px-3 py-1">
                DASHBOARD
              </button>
            </Link>
            <Link href="/careerguide">
              <button className="navbutton bg-white rounded-lg px-3 py-1">
                CAREER GUIDE
              </button>
            </Link>
            <AppHeaderDropdown imgUrl={profileUrl} logoutUser={logoutUser} />
          </div>
        ) : (
          <div className="flex gap-5 items-center">
            <Link href="/explore">
              <button className="navbutton bg-white rounded-lg px-3 py-1">
                EXPLORE
              </button>
            </Link>
            <Link href="/careerguide">
              <button className="navbutton bg-white rounded-lg px-3 py-1">
                CAREER GUIDE
              </button>
            </Link>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={async () => {
                    try {
                      await signIn(provider.id, {
                        callbackUrl: "/explore", // Set the custom redirect URL here
                      });
                    } catch (error) {
                      console.error("Error during sign-in:", error);
                      window.confirm("Error during sign-in: ");
                    }
                  }}
                  className="navbutton bg-white rounded-lg px-3 py-1"
                >
                  STUDENT LOGIN
                </button>
              ))}
            <Link href="/signupCompany">
              <button className="registerbtn bg-white rounded-lg px-3 py-1">
                COMPANY REGISTER
              </button>
            </Link>
            <Link href="/loginCompany">
              <button className="loginbtn bg-white rounded-lg px-3 py-1">
                COMPANY LOGIN
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
