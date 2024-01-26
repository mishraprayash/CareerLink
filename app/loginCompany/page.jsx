"use client";
import React from "react";
import { useState, useContext } from "react";
// import userContext from "./userContext";
import "./loginCompany.css";
import Link from "next/link";

function Login() {
  const [cemail, setCemail] = useState("");
  const [password, setPassword] = useState("");
//   const { setUser } = useContext(userContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ cemail, password });
  };

  return (
    <div class="split-screen">
      <div class="left">
        <div className="makecenter">

        <section class="copy">
          <h1>Welcome Back To</h1>
          <p>CareerLink</p>
        </section>
        </div>
      </div>

      <div class="right">
        <form>
          <section class="copy">
            <h2>Find the perfect fit for your Company</h2>
            <div class="login-container">
              <p>
                Don't have an account?
                <a href="#">
                  <strong>Register Now</strong>
                </a>
              </p>
            </div>
          </section>

          {/* <!-- <div class="input-container name">
            <label for="fname">Company Name</label>
            <input type="text" id="fname" class="fname" placeholder="Full Name" />
          </div> --> */}

          <div class="input-container email">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              class="email"
              placeholder="example@gmail.com"
            />
          </div>
          <div class="input-container password">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              class="password"
              placeholder="Enter Password"
            />
          </div>

          {/* 
          <!-- <div class="input-container cta">
            <label class="checkbox-container">
              <input type="checkbox" />
              <span class="checkmark"></span>
              Sign Up for email updates.
            </label>
          </div> 
        
        <label>Message</label>
	 <textarea></textarea>
        -->
        <!-- <div class="input-container name">
            <label for="fname">Location</label>
            <input type="text" id="fname" class="fname" placeholder="City, District" />
          </div>

          <div class="input-container email">
            <label for="phone">Enter Telephone number:</label>
            <input type="tel" id="phone" name="phone" pattern="+[0-9]{3}-[0-9]{6}"> 
          </div>

        <div class="input-container about">
            <label for="about">About Company</label>
	 <textarea ></textarea>
          </div> --> */}
          <div class="forget">
            Forget password?
            <a href="#">
              <strong>Reset Now</strong>
            </a>
          </div>

          <Link href='/explore' >
          <button class="signup-btn" type="submit">
            Login
          </button>
</Link>

          <section class="copy legal">
            <p>
              <span class="small">
                By continuing,you agree to accept our <br />
                <a href="#">Privacy Policy</a>&amp;
                <a href="#">Terms of Service</a>.
              </span>
            </p>
          </section>
        </form>
      </div>
    </div>
  );
}
export default Login;

