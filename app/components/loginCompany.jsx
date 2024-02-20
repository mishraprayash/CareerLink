"use client";
import React from "react";
import { useState, useContext } from "react";
import userContext from "./userContext";
import "./styles/loginCompany.css";

function Login() {
  const [cemail, setCemail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ cemail, password });
  };

  return (
    <div classname="split-screen">
      <div classname="left">
        <section classname="copy">
          <h1>Welcome Back To</h1>
          <p>CareerLink</p>
        </section>
      </div>

      <div classname="right">
        <form>
          <section classname="copy">
            <h2>Find the perfect fit for your Company</h2>
            <div classname="login-container">
              <p>
                Don't have an account?
                <a href="#">
                  <strong>Register Now</strong>
                </a>
              </p>
            </div>
          </section>

         

          <div classname="input-container email">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              classname="email"
              placeholder="example@gmail.com"
            />
          </div>
          <div classname="input-container password">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              classname="password"
              placeholder="Enter Password"
            />
          </div>

     
          <div classname="forget">
            Forget password?
            <a href="#">
              <strong>Reset Now</strong>
            </a>
          </div>
          <button classname="signup-btn" type="submit">
            Login
          </button>
          <section classname="copy legal">
            <p>
              <span classname="small">
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




