"use client";
import { useState, createContext, useEffect, useCallback } from "react";
import { getReq } from "../hooks/service";
import { useSession, signOut } from "next-auth/react";
export const AuthContext = createContext();
import Cookies from "js-cookie";
import { ToastMessage } from "../components/ToastMessage";
import { useRouter } from "next/navigation";

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { data: session } = useSession();
  console.log(user)
  const adminsession = Cookies.get('admin')
  const companysession = Cookies.get('company')
  const logoutUser = useCallback(async () => {
    if (session && session?.user) {
      signOut()
      setUser(null)
    } else {
      const response = await getReq('/api/common/logout')
      console.log(response)
      if (companysession) {

        Cookies.remove('company');
      } else if (adminsession) {
        Cookies.remove("admin")
      }
      if (!response.error) {
        ToastMessage("Success", response.msg)
        setUser(null);
      } else {
        ToastMessage("Error", response.msg)
      }
      router.push("/")
    }
  }, [session]);


  useEffect(() => {
    const fetchProfile = async () => {
      if (session && session?.user) {
        const response = await getReq('/api/student/profile')
        setUser(response);
      } else if (adminsession) {
        const response = await getReq('/api/admin/getprofile')
        if (!response.error) {
          setUser(response)
        }
      } else if (companysession) {
        const response = await getReq('/api/company/getprofile')
        if (!response.error) {
          setUser(response)
        }
      } else {
        setUser(null)
      }
    }
    fetchProfile()
  }, [session]);
  return (
    <AuthContext.Provider value={{ user, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
