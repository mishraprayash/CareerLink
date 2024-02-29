
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import React from "react";
import "./styles/footerStyle.css";

const Footer = () => {
  return (
    <div className="footerpart">
      <div className="footer1">
        <h2 className="header py-4">ABOUT US</h2>
        <div className="college">
          <div className="">
            <Image
              className=""
              src="https://res.cloudinary.com/dkracb8u5/image/upload/v1706380270/Careerlink/Public/ej5izqga34pvxuisqy1j.png"
              width={260}
              height={130}
              alt="campus"
            />
          </div>
          <div className="name"></div>
        </div>
        <div className="flex flex-col px-5 text-blue-900 overflow-hidden footer-content">
          <p> P.O. Box : 46 , Lamachaur Pokhara</p>
          <p>Tel. : 061-440457, 440463, 440093, 440465</p>
          <p>Fax No. : 061-440158</p>
          <p>
            E-mail :{" "}
            <a href="mailto:info@ioepas.edu.np" className="text-blue-600">
              info@ioepas.edu.np
            </a>
          </p>
        </div>
      </div>
      <div className="footer2 text-blue-900 footer-content">
        <h2 className="header py-4">COMPANIES</h2>
        <p>Partnership</p>
        <p>Career</p>
        <p>Explore opportunities</p>
      </div>
      <div className="footer3">
        <h2 className="header py-4">SOCIAL</h2>
        <div className=" flex justify-center">
          <FontAwesomeIcon
            icon={faFacebook}
            size="xs"
            className="h-12 p-2  text-[#0F1035]"
          />
          <FontAwesomeIcon
            icon={faLinkedin}
            size="xs"
            className="h-12 p-2 text-[#0F1035]"
          />
          <FontAwesomeIcon
            icon={faInstagram}
            size="xs"
            className="h-12 p-2 text-[#0F1035]"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
