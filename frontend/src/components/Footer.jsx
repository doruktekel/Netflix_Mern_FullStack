import React from "react";

const Footer = () => {
  return (
    <div className=" bg-black text-white w-full py-10 underline  ">
      <div className="h-1 w-full bg-gray-700  aria-hidden:true"></div>

      <div className="justify-center items-center flex gap-10 p-20 h-40">
        <a
          href="https://github.com/doruktekel"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go To My GitHub Account
        </a>
        <a
          href="https://www.linkedin.com/in/doruktekel/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go To My Linkedin Account
        </a>
      </div>
    </div>
  );
};

export default Footer;
