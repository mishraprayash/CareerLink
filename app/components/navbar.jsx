"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
// import "./styles/navstyle.css";1
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

  //  console.log(CompanyImageUrl)
  useEffect(() => {
    setProfileUrl(user?.student ? StudentImageUrl : CompanyImageUrl);
  }, [user]);

  return (
    <div className="flex flex-row justify-between bg-[#DBE7C9]">
      <div className="flex gap-5">
        <Link className="no-underline p-3 ml-5" href="/">
          <Image
            className="  rounded-full"
            src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/pvqct2blfs7ntb4hdtmt"
            width={40}
            height={40}
            alt="logo"
          />
        </Link>
        <Link
          className="font-bold text-[#108A00] text-[30px] no-underline py-3"
          href="/"
        >
          CareerLink
        </Link>
      </div>
      <div className="forbutton flex items-center p-5">
        {user ? (
          <div className="flex flex-row gap-5 items-center">
            <Link
              href="/"
              className="navbutton no-underline bg-white rounded-lg px-3 py-1"
            >
              <button>Home</button>
            </Link>
            <Link
              href="/explore"
              className="navbutton no-underline bg-white rounded-lg px-3 py-1"
            >
              <button>Explore</button>
            </Link>
            <Link
              href="/dashboard"
              className="navbutton no-underline bg-white rounded-lg px-3 py-1"
            >
              <button>Dashboard</button>
            </Link>
            <Link
              href="/careerguide"
              className="navbutton no-underline bg-white rounded-lg px-3 py-1"
            >
              <button>Career Guide</button>
            </Link>
            {/* <Link href='/profile'>
               
                <Image src={user?.student?StudentImageUrl:CompanyImageUrl}
                  alt="profile"
                  height={30}
                  width={30}
                  className='mx-4 rounded-lg'
                />
              </Link> */}
            <AppHeaderDropdown imgUrl={profileUrl} logoutUser={logoutUser} />
          </div>
        ) : (
          <div className="flex flex-row gap-5 items-center">
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
                  className="bg-white rounded-lg px-3 py-1"
                >
                  STUDENT LOGIN
                </button>
              ))}
            <Link href="/signupCompany" className="no-underline">
              <button className="registerbtn bg-white rounded-lg px-3 py-1">
                COMPANY REGISTER
              </button>
            </Link>

            <Link href="/loginCompany" className="no-underline">
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
