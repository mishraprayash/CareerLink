import React from "react";
import './signupCompany.css'
import Link from "next/link";

const page = () => {
  return (
    <div class="body">
      <div class="split-screen">
        <div class="left">
          <section class="copy">
            <h1>Welcome To</h1>
            <p>CareerLink</p>
          </section>
        </div>
        <div class="right">
          <form>
            <section class="copy">
              
              <div class="login-container">
              <h2>Create an account. It's fast & easy.</h2>
                <p>
                  Already have an account?{" "}
                  <a href="#">
                    <strong>Log In</strong>
                  </a>
                </p>
              </div>
            </section>
            <div class="input-container name">
              <label for="cname">Company Name</label>
              <input
                type="text"
                id="cname"
                class="cname"
                placeholder="Full Name"
              />
            </div>

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
                placeholder="Must be at least 6 characters"
              />
            </div>
            {/* <!-- <div class="input-container cta">
            <label class="checkbox-container">
              <input type="checkbox" />
              <span class="checkmark"></span>
              Sign Up for email updates.
            </label>
          </div> 
        
        <label>Message</label>
	 <textarea></textarea>
        --> */}
            <div class="input-container location">
              <label for="clocation">Location</label>
              <input
                type="text"
                id="clocation"
                class="clocation"
                placeholder="City, District"
              />
            </div>

            <div class="input-container email">
              <label for="phone">Enter Telephone number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+061-123456"
                pattern="+[0-9]-[0-9]{6}"
              />
            </div>

            <div class="input-container about">
              <label for="about">About Company</label>
              <textarea
              placeholder="Words to describe company..."
              ></textarea>
            </div>

            <button class="signup-btn" type="submit">
              Affiliate
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
    </div>
  );
};

export default page;
