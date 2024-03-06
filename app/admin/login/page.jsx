"use client";
import React, { useState } from "react";
import "@/app/loginCompany/loginCompany.css";
import { useRouter } from "next/navigation";
import { ToastMessage } from "@/app/components/ToastMessage";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    try {
      // Make a POST request to your server
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Response:", data);
        ToastMessage("Success",data.msg)
        router.push('/admin/dashboard')
        window.location.reload();
    }else{
      ToastMessage("Error",data.msg)
    }
     
      
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error:", error);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="split-screen">
      <div className="left">
        <div className="makecenter"></div>
      </div>

      <div className="right">
        <form onSubmit={handleSubmit}>
          <section className="copy">
            {/* <h2>Find the perfect fit for your Company</h2> */}
            <div className="login-container">
              <p>
                Don't have an admin account?
                <a href="/admin/register">
                  <strong>Register Now</strong>
                </a>
              </p>
            </div>
          </section>

          <div className="input-container email">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="email"
              className="email"
              placeholder="admin1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <a href="#">
              <strong>Reset Now</strong>
            </a>
          </div>

          <button className="signup-btn" type="submit" onClick={handleSubmit}>
            Login
          </button>

          <section className="copy legal">
            <p>
              <span className="small">
                By continuing, you agree to accept our <br />
                <a href="#">Privacy Policy</a>&amp;
                <a href="#">Terms of Service</a>.
              </span>
            </p>
          </section>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
