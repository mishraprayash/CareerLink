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
    <div class="split-screen">
      <div class="left">
        <section class="copy">
          <h1>Welcome Back To</h1>
          <p>CareerLink</p>
        </section>
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

     
          <div class="forget">
            Forget password?
            <a href="#">
              <strong>Reset Now</strong>
            </a>
          </div>
          <button class="signup-btn" type="submit">
            Login
          </button>
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




