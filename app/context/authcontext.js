"use client";
import { useState, createContext, useEffect, useCallback } from "react";
import { getReq } from "../hooks/service";
import { useSession, signOut } from "next-auth/react";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();
// console.log(session)
console.log(user)
  const logoutUser = useCallback(async() => {
    if (session && session?.user) {
        signOut()   
        setUser(null)
    }else{
     const response=await getReq('/api/common/logout')
     console.log(response)
     if(!response.error){

       setUser(null);
     }
    }
  }, [session]);


  useEffect(() => {
   const fetchProfile=async()=>{
    if (session && session?.user) {
      const response= await getReq('/api/student/profile')
      // console.log(response)\
      setUser(response);
    } else{
      const response=await getReq('/api/company/getprofile')
     if(!response.error){
       setUser(response)
     }

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
