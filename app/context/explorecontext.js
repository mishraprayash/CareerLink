"use client"
import { useState, createContext, useEffect,useCallback } from "react";
import { getReq } from "../hooks/service";

export const ExploreContext = createContext();
export const ExploreContextProvider = ({ children }) => {
  const [internships, setInternships] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ singleInternship ,setSingleInternship]=useState(null)
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
  const singleInternshipFetch=useCallback(async(key)=>{
    try {
        const response = await getReq(`/api/common/explore/${key}`);
        console.log("single internship", response);
        
        if (!response.error) {
          setSingleInternship(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
   })
   
  
   return (
    <ExploreContext.Provider value={{ internships,singleInternship,singleInternshipFetch, loading }}>
      {children}
    </ExploreContext.Provider>
  );
};
