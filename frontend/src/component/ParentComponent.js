import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const ParentComponent = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  // Function to switch between login and register forms
  const handleFormSwitch = (formType) => {
    if (formType === "register") {
      setIsLoginForm(false); // Switch to register form
    } else {
      setIsLoginForm(true); // Switch to login form
    }
  };

  return (
    <div>
      {isLoginForm ? (
        <Login onFormSwitch={handleFormSwitch} />
      ) : (
        <Register onFormSwitch={handleFormSwitch} />
      )}
    </div>
  );
};

export default ParentComponent;
