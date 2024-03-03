'use client'
import React, { useState } from "react";
import '@/app/signupCompany/signupCompany.css'
import { postReq } from "@/app/hooks/service";

import { useRouter } from "next/navigation";
import { ToastMessage } from "@/app/components/ToastMessage";
const page = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword:""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!(formData.password===formData.confirmPassword)){
      ToastMessage("Warning","Password and Confirm Password must be same")
      return {msg:"Password and Confirm Password must be same"}
    }
    console.log(formData)
    const response = await postReq("/api/admin/register", formData)
    console.log(response)
    if (!response.error) {
      ToastMessage("Success",response.msg)

      const router=useRouter()
      router.push('/admin/login')

    }
    else {
      console.log(response.error)
      ToastMessage("Error",response.msg)

    };
  }
  return (
    <div className="body">
      <div className="split-screen">
        <div className="left">
          <div className="makecenter">

            <section className="copy">
              <h1>Welcome To</h1>
              {/* <p>CareerLink</p> */}
            </section>
          </div>
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <section className="copy">

              <div className="login-container">
                <h2>Create an account. It's fast & easy.</h2>
                <p>
                  Already have an account?{" "}
                  <a href="#">
                    <strong>Log In</strong>
                  </a>
                </p>
              </div>
            </section>
            <div className="input-container name">
              <label htmlFor="cname">Admin UserName</label>
              <input
                type="text"
                id="cname"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="cname"
                placeholder="Full Name"
              />
            </div>

            <div className="input-container email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="email"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="input-container password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="password"
                placeholder="Must be at least 6 characters"
              />
            </div>
            <div className="input-container password">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="password"
                placeholder="Must be at least 6 characters"
              />
            </div>

            <button className="signup-btn" type="submit">
              Register
            </button>
            <section className="copy legal">
              <p>
                <span className="small">
                  By continuing,you agree to accept our <br />
                  <a href="#">Privacy Policy</a>&amp;
                  <a href="#">Terms of Service</a>.
                </span>
              </p>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
