"use client"
import { useState, createContext, useEffect, useCallback } from "react";
import { getReq, patchReq, postReq } from "../hooks/service";
import { useContext } from "react";
import { AuthContext } from "./authcontext";

export const InternshipContext = createContext();

export const InternshipContextProvider = ({ children }) => {
  const [runningInternships, setRunningInternships] = useState(null)
  const [pendingInternships, setPendingInternships] = useState(null)
  const [applicants, setApplicants] = useState(null)
  const [loading, setLoading] = useState(true)
  const [internshipApplyStatus, setInternshipApplyStatus] = useState(null)
  const [pendingInternshipsAdmin, setPendingInternshipsAdmin] = useState(null)
  const [pendingCompany, setPendingCompany] = useState(null)
  const [pendingAdmin, setPendingAdmin] = useState(null)
  const [adminDashboardInfo, setAdminDashboardInfo] = useState(null)
  const [acceptedStatus, setAcceptedStatus] = useState(null)
  const [rejectedStatus, setRejectedStatus] = useState(null)
  const [passwordChangeStatus, setPasswordChangeStatus] = useState(null)
  const { user } = useContext(AuthContext)
  useEffect(() => {

    const runninginternships = async () => {
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
  }, [user?.company])

  useEffect(() => {
    const pendinginternships = async () => {
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
  }, [user?.company])
  const seeApplicants = useCallback(async (key) => {
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
  }, [user?.company])
  const applyforInternship = useCallback(async (key) => {
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
  }, [user?.student])

  useEffect(() => {
    const pendinginternships = async () => {
      try {
        const response = await getReq('/api/admin/pendinginternships');
        console.log("pending Internships", response);

        if (!response.error) {
          setPendingInternshipsAdmin(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    pendinginternships()
  }, [user?.admin])
  useEffect(() => {
    const pendingcompany = async () => {
      try {
        const response = await getReq('/api/admin/pendingcompanies');
        console.log("pending company", response);

        if (!response.error) {
          setPendingCompany(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    pendingcompany()
  }, [user?.admin])
  useEffect(() => {
    const pendingadmin = async () => {
      try {
        const response = await getReq('/api/admin/pendingadmins');
        console.log("pending admin", response);

        if (!response.error) {
          setPendingAdmin(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    pendingadmin()
  }, [user?.admin])
  //dashboard info
  useEffect(() => {
    const dashboardInfo = async () => {
      try {
        const response = await getReq('/api/admin/allinformations');
        console.log("pending Internships", response);

        if (!response.error) {
          setAdminDashboardInfo(response.dashboardInfo);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    dashboardInfo()
  }, [user?.admin])
  const accept = useCallback(async (id, role) => {
    try {
      console.log(id, role)
      const response = await postReq(`/api/admin/new/accept`, { id, role });
      console.log("Accepted", response);

      if (!response.error) {
        setAcceptedStatus(response.msg);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.admin])
  const reject = useCallback(async (id, role) => {
    try {
      console.log(id, role)
      const response = await postReq(`/api/admin/new/accept`, { id, role });
      console.log("Rejected", response);

      if (!response.error) {
        setRejectedStatus(response.msg);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.admin])


  const changepassword = useCallback(async (currentPassword, newPassword, confirmNewPassword) => {
    try {
      if (user?.company) {
        const response = await postReq(`/api/company/changepassword`, { currentPassword, newPassword, confirmNewPassword });
        console.log("company passwordchangeStatus", response);

        if (!response.error) {
          setPasswordChangeStatus(response.msg);
        }
      } else {
        const response = await postReq(`/api/admin/changepassword`, { currentPassword, newPassword, confirmNewPassword });
        console.log("admin passwordchangeStatus:", response);

        if (!response.error) {
          setPasswordChangeStatus(response.msg);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.admin || user?.company])
  return (
    <InternshipContext.Provider value={{ runningInternships, pendingInternships, loading, applyforInternship, internshipApplyStatus, seeApplicants, applicants, pendingInternshipsAdmin, pendingCompany, pendingAdmin, adminDashboardInfo, accept, acceptedStatus, reject, rejectedStatus, changepassword, passwordChangeStatus }}>
      {children}
    </InternshipContext.Provider>
  );
};


