import React from "react";
import logoUrl from "./logo.png"; // Import the image directly
import { Link } from "react-router-dom";
const LogoUrl = () => {
  return (
    <div>
      <Link className="logo-link" to="/home">
        {" "}
        <img src={logoUrl} alt="Logo" className="logo" />
      </Link>
    </div>
  );
};

export default LogoUrl;
