import React from "react";
import "./styles/landingStyle.css";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="lpage">
      <div className="content">
        <div className="singlecontent">
          <div className="flex flex-col flex-1 p-5 bg-[#DBE7C9] rounded-[0.5rem] items-center">
            <h1 className="header py-4">CareerForge Nexus</h1>
            <p className="font-serif">
              "Dive into opportunities, unleash potential, and illuminate your
              journey with best provided internships, practical hands on
              experience in the real world problems and with the best mentorship
              and career guides."
            </p>
            <Link className="forexplorebtn py-4" href="/explore">
              <button>EXPLORE OPPORTUNITIES</button>
            </Link>
          </div>

          <div className="right">
            <div className="box">
              <h4 className="text-green-600 text-md font-serif font-bold text-center">
                Involve in Different Activities
              </h4>
              <p className="boxp font-serif">Internship</p>
              <p className="boxp font-serif">Career Guidance Program</p>
              <p className="boxp font-serif">Training from Experts</p>
            </div>
            <Image
              src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/bh9oahvhzvavkgcoofm0"
              alt="logo"
              className="firstimg"
              width={400}
              height={300}
            />
          </div>
        </div>

        <div className="singlecontent">
          <div className="right">
            <Image
              className="otherimg"
              src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/kgd5nkourxfvehtwlsiq.jpg"
              width={400}
              height={400}
              alt="collaboration"
            />
          </div>
          <div className="flex flex-col flex-1 p-5 bg-[#DBE7C9] rounded-[0.5rem] items-center">
            <h1 className="header font-bold py-4">
              Be a Trailblazing Affiliated Partner
            </h1>
            <p className="font-serif">
              "Ignite growth for your company with our Affiliated Partner
              program. Seamlessly offer internships, cutting-edge training, and
              mentorship. Let's shape success together!"
            </p>
            <Link className="forexplorebtn py-4" href="/signupCompany">
              <button>JOIN OUR PLATFORM</button>
            </Link>
          </div>
        </div>

        <div className="singlecontent mb-4">
          <div className="flex flex-col flex-1 p-5 bg-[#DBE7C9] rounded-[0.5rem] items-center g-10">
            <h1 className="header font-bold py-4">Trusted Affiliation</h1>
            <p className="font-serif">
              "At CareerLink, we stand among the best, backed by partnerships
              with industry giants like [Notable Company 1], [Notable Company
              2], and [Notable Company 3]. Join us for unparalleled
              opportunities and trusted connections in your journey to success."
            </p>
            <Image
              className="extraimg m-5"
              src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/qbkeuuktrhlywc8qzzxo.png"
              alt="tick"
              width={500}
              height={300}
            />
          </div>
          <div className="right">
            <Image
              className="extraimg"
              src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/ab62m6gftdbevhixphda.jpg"
              alt="handshaking"
              width={500}
              height={300}
            />
          </div>
        </div>

        <div className="singlecontent">
          <div className="flex flex-col flex-1 p-5 bg-[#DBE7C9] rounded-[0.5rem] items-center">
            <h1 className="header font-bold py-4">Partners</h1>
            <p className="font-serif">
              {" "}
              "Their unwavering commitment to our mission amplifies our
              dedication to fostering a thriving educational environment.
              Together, with our incredible partners, we strive to empower
              students with an even greater array of transformative experiences,
              ensuring a future rich with possibilities."
            </p>
            <Link className="forexplorebtn py-4" href="/signupCompany">
              <button>BECOME OUR PARTNER</button>
            </Link>
          </div>
          <div className="right">
            <Image
              className="extraimg"
              src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/caougtcgbdotesnx1e8r.jpg"
              alt="handshaking"
              width={500}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
