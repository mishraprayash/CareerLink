"use client"
import { useState, createContext, useEffect,useCallback } from "react";
import { getReq } from "../hooks/service";

export const ExploreContext = createContext();
export const ExploreContextProvider = ({ children }) => {
  const [internships, setInternships] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReq('/api/common/explore');
        console.log("internships", response);

        if (!response.error) {
          setInternships(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[]);
  
   return (
    <ExploreContext.Provider value={{ internships, loading }}>
      {children}
    </ExploreContext.Provider>
  );
};
