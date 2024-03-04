"use client";
import React, { useState } from "react";
import "./loginCompany.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastMessage } from "../components/ToastMessage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      // Make a POST request to your server
      const response = await fetch("/api/company/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        ToastMessage("Success", data.msg);
        router.push("/dashboard");
        router.revalidate();
      } else {
        const data = await response.json();
        ToastMessage("Error", data.msg);
      }
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error:", error);
    }
  };

  return (
    <div className="split-screen">
      <div className="left">
        <div className="makecenter">
          <section className="copy">
            {/* <h1 className="mb-24">Welcome Back To</h1>
            <p className="text-4xl">CareerLink</p> */}
          </section>
        </div>
      </div>

      <div className="right">
        <form onSubmit={handleSubmit}>
          <section className="copy">
            <h2>Find the perfect fit for your Company</h2>
            <div className="login-container">
              <p>
                Don't have an account?
                <Link href="/signupCompany">
                  <strong>Register Now</strong>
                </Link>
              </p>
            </div>
          </section>

          <div className="input-container email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="forget">
            Forget password?
            <Link href="#">
              <strong>Reset Now</strong>
            </Link>
          </div>

          <button className="signup-btn" type="submit" onClick={handleSubmit}>
            Login
          </button>

          <section className="copy legal">
            <p>
              <span className="small">
                By continuing, you agree to accept our <br />
                <Link href="#">Privacy Policy</Link>&amp;
                <Link href="#">Terms of Service</Link>.
              </span>
            </p>
          </section>
        </form>
      </div>
    </div>
  );
}

export default Login;
