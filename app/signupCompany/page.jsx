"use client";
import React, { useState } from "react";
import "./signupCompany.css";
import Link from "next/link";
import { postReq } from "../hooks/service";
import { useRouter } from "next/navigation";

import { ToastMessage } from "../components/ToastMessage";
const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!(formData.companyName && formData.email && formData.password && formData.confirmPassword)) {
      ToastMessage("Warning", "Fill up all the fields before submitting");
      return;
    }
    if (!(formData.password === formData.confirmPassword)) {
      ToastMessage("Warning", "Password and Confirm Password must be same");
      return { msg: "Password and Confirm Password must be same" };
    }
    console.log(formData);
    const response = await postReq("/api/company/register", formData);
    console.log(response);
    if (!response.error) {
      ToastMessage("Success", response.msg);
      router.push("/loginCompany");
    } else {
      console.log(response.error);
      ToastMessage("Error", response.msg);
    }
  };
  return (
    <div className="body">
      <div className="split-screen">
        <div className="left">
          <div className="makecenter">
            <section className="copy">
              {/* <h1 className="mb-24">Welcome To</h1>
              <p className="text-4xl ">Career<br></br>Link</p> */}
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
                  <Link href="/loginCompany">
                    <strong>Log In</strong>
                  </Link>
                </p>
              </div>
            </section>
            <div className="input-container name">
              <label htmlFor="cname">Company Name</label>
              <input
                type="text"
                id="cname"
                name="companyName"
                value={formData.companyName}
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
              Affiliate
            </button>
            <section className="copy legal">
              <p>
                <span className="small">
                  By continuing,you agree to accept our <br />
                  <Link href="#">Privacy Policy</Link>&amp;
                  <Link href="#">Terms of Service</Link>.
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
