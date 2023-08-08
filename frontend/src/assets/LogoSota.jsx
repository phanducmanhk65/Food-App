import React from "react";
import logoUrl from "./logo.png"; // Import the image directly

const LogoUrl = () => {
  return (
    <div>
      <img src={logoUrl} alt="Logo" className="logo" />
    </div>
  );
};

export default LogoUrl;
