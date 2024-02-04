"use client"
import { useState, createContext, useEffect,useCallback } from "react";
import { getReq, patchReq } from "../hooks/service";
import { useContext } from "react";
import { AuthContext } from "./authcontext";

export const InternshipContext = createContext();

export const InternshipContextProvider = ({ children }) => {
    const [runningInternships,setRunningInternships]=useState(null)
    const [pendingInternships,setPendingInternships]=useState(null)
    const [applicants, setApplicants]=useState(null)
    const [loading,setLoading]=useState(true)
    const [internshipApplyStatus,setInternshipApplyStatus]=useState(null)

    const {user}=useContext(AuthContext)
  useEffect(()=>{

    const runninginternships=async()=>{
      try {
        const response = await getReq('/api/company/runninginternships');
        console.log("Running Internships", response);
        
        if (!response.error) {
          setRunningInternships(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    runninginternships()
  },[user?.company])

  useEffect(()=>{
    const pendinginternships=async()=>{
        try {
          const response = await getReq('/api/company/pendinginternships');
          console.log("pending Internships", response);
          
          if (!response.error) {
            setPendingInternships(response.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
    }

    pendinginternships()
  },[user?.company])
   const seeApplicants=useCallback(async(key)=>{
    try {
        const response = await getReq(`/api/company/runninginternships/${key}/getAllApplicants`);
        console.log("applicant", response);
        
        if (!response.error) {
          setApplicants(response.applicants);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
   },[user?.company])
   const applyforInternship=useCallback(async(key)=>{
    try {
        const response = await patchReq(`/api/student/applyinternship/${key}`);
        console.log("internship application status", response);
        
        if (!response.error) {
          setInternshipApplyStatus(response.msg);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
   },[user?.student])
    return (
        <InternshipContext.Provider value={{ runningInternships, pendingInternships,loading ,applyforInternship,internshipApplyStatus,seeApplicants,applicants}}>
          {children}
        </InternshipContext.Provider>
      );
    };


