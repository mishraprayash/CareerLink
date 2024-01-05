"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import './styles/navstyle.css'

const Navbar = () => {
  const { data: session, status } = useSession()
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false);
  console.log(session, status)
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
  return (
    <div className="nav">
      <div className="logo">
        <Image className="logoimg" src="/image/logo.png" width={40} height={40} />
      </div>
      <div className="name">CareerLink</div>
      <div className="forbutton flex ">
        {
          session?.user ? (
            <div className="flex gap-3">
              <Link href='/explore' className="navbutton">
                Explore
              </Link>
              <Link href='/careerguide' className="navbutton">
                Career Guide
              </Link>
              <Link href='/careerguide' className="navbutton">
                Training
              </Link>
              <button  onClick={signOut} className="navbutton">
                Sign Out
              </button>
              <Link href='/profile'>
                <Image src={session?.user.image}
                  alt="profile"
                  height={30}
                  width={30}
                  className='mx-4 rounded-lg'
                />
              </Link>
            </div>
          ) : (<div>
            {
              providers && Object.values(providers).map((provider) => (
                <button 
                  key={provider.name}
                  onClick={() => signIn(provider.id)} className="loginbtn">
                  STUDENT LOGIN
                </button>
              ))
            }
            <button className="loginbtn">COMPONY LOGIN</button>
            <button className="registerbtn"> COMPONY REGISTER</button>

          </div>
          )
        }


      </div>
    </div>
  )
}

export default Navbar
