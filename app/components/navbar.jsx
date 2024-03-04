"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { AuthContext } from "../context/authcontext";
import AppHeaderDropdown from "./AppHeaderDropdown";
import { useRouter } from "next/navigation";
import { ToastMessage } from './ToastMessage';

const Navbar = () => {
  const router = useRouter();
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
    <div className="flex flex-row justify-between bg-[#CCD3CA]">
      <div className="flex gap-5">
        <Link className="no-underline p-3 ml-5" href="/">
          <Image
            className="rounded-full hover:scale-105 transition-all"
            src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/pvqct2blfs7ntb4hdtmt"
            width={40}
            height={40}
            alt="logo"
          />
        </Link>
        <Link
          className="font-bold text-[#108A00] text-[30px] py-3 hover:no-underline"
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
              className="navbutton no-underline bg-white rounded-lg px-3 py-1 hover:bg-pink-500 hover:text-white hover:scale-105 transition-all"
            >
              <button>Home</button>
            </Link>
            <Link
              href="/explore"
              className="navbutton no-underline bg-white rounded-lg px-3 py-1 hover:bg-pink-500 hover:text-white hover:scale-105 transition-all"
            >
              <button>Explore</button>
            </Link>
            <Link
              href="/dashboard"
              className="navbutton no-underline bg-white rounded-lg px-3 py-1 hover:bg-pink-500 hover:text-white hover:scale-105 transition-all"
            >
              <button>Dashboard</button>
            </Link>
            <Link
              href="/careerguide"
              className="navbutton no-underline bg-white rounded-lg px-3 py-1 hover:bg-pink-500 hover:text-white hover:scale-105 transition-all"
            >
              <button>Career Guide</button>
            </Link>
            <AppHeaderDropdown imgUrl={profileUrl} logoutUser={logoutUser}/>
          </div>
        ) : (
          <div className="flex flex-row gap-5 items-center ">
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
                    }
                  }}
                  className="bg-white rounded-full px-3 py-1  hover:bg-pink-500 hover:text-white hover:scale-105 transition-all"
                >
                  STUDENT LOGIN
                </button>
              ))}
            <Link href="/signupCompany" className="no-underline">
              <button className="registerbtn bg-white rounded-full px-3 py-1 hover:bg-pink-500 hover:text-white hover:scale-105 transition-all">
                COMPANY REGISTER
              </button>
            </Link>

            <Link href="/loginCompany" className="no-underline">
              <button className="loginbtn bg-white rounded-full px-3 py-1 hover:bg-pink-500 hover:text-white hover:scale-105 transition-all">
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
