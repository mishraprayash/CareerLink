"use client";

import Link from "next/link";
import Image from "next/image";
import {useContext, useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import './styles/navstyle.css'
import { AuthContext } from "../context/authcontext";
import AppHeaderDropdown from "./AppHeaderDropdown";
const Navbar = () => {
  const { data: session } = useSession()

  const {user,logoutUser}=useContext(AuthContext)
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [profileUrl,setProfileUrl]=useState(null)
  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
   
      if (response && response.error) {

        console.error("Error fetching providers:", response.error);
      } else {

        setProviders(response);
      }
    }
    setProvider()
  }, [])
  const StudentImageUrl=user?.student?.profilePicture?user.student.profilePicture.secure_url:session?.user.image
 const CompanyImageUrl=user?.company?.logo?user.company.logo.secure_url:"/Image/Companylogo.jpg"
//  console.log(CompanyImageUrl)
useEffect(()=>{
setProfileUrl(user?.student?StudentImageUrl:CompanyImageUrl)
},[user])
  return (
    <div className="nav">
      <div className="logo">
        <Image className="logoimg" src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/tuzqbpgoquw2pg6ytgon.png" width={40} height={40} alt="logo"/>
      </div>
      <div className="name">CareerLink</div>
      <div className="forbutton flex ">
        {
          user ? (
            <div className="flex gap-3">
               <Link href='/' className="navbutton flex justify-center items-center">
                Home
              </Link>
              <Link href='/explore' className="navbutton flex justify-center items-center">
                Explore
              </Link>
              <Link href='/dashboard' className="navbutton flex justify-center items-center">
                Dashboard
              </Link>
              <Link href='/careerguide' className="navbutton flex justify-center items-center">
                Training
              </Link>
              {/* <Link href='/profile'>
               
                <Image src={user?.student?StudentImageUrl:CompanyImageUrl}
                  alt="profile"
                  height={30}
                  width={30}
                  className='mx-4 rounded-lg'
                />
              </Link> */}
              <AppHeaderDropdown imgUrl={profileUrl} logoutUser={logoutUser}/>
            </div>
          ) : (<div>
            {
              providers && Object.values(providers).map((provider) => (
                <button 
                  key={provider.name}
                  onClick={async() => {
                    try {
                    await signIn(provider.id, {
                      callbackUrl: '/explore', // Set the custom redirect URL here
                    });
                    
                  } catch (error) {
                    console.error('Error during sign-in:', error);
                    window.confirm("Error during sign-in: ")
                  
                  }}} className="loginbtn">
                  STUDENT LOGIN
                </button>
              ))
            }
             <Link href='/signupCompany' >
              <button className="registerbtn"> COMPANY REGISTER</button>
              </Link>
         
            <Link href='/loginCompany' >
            <button className="loginbtn">COMPANY LOGIN</button>
              </Link>
             
          

          </div>
          )
        }


      </div>
    </div>
  )
}

export default Navbar
