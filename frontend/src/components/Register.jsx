import {
  CaretLeftOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import "../styles/Login.scss";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Sign Up</div>
        <div className="text">username :</div>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
        ></input>
        <div className="text">Email :</div>
        <input
          type="text"
          placeholder="Email "
          value={email}
          onChange={handleEmailChange}
        ></input>
        <div className="text">Password :</div>
        <div className="input-pass">
          <input
            type={isShowPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <i>
            {isShowPassword ? (
              <EyeOutlined
                onClick={() => setIsShowPassword(!isShowPassword)}
                style={{ fontSize: "18px" }}
              />
            ) : (
              <EyeInvisibleOutlined
                onClick={() => setIsShowPassword(!isShowPassword)}
                style={{ fontSize: "18px" }}
              />
            )}
          </i>
        </div>
        <div className="text">Phone :</div>
        <input
          type="text"
          placeholder="Phone"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        ></input>
          <div className="text">Address :</div>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={handleAddressChange}
        ></input>
        <button
          className={email && password && username && phoneNumber && address? "active" : ""}
          disabled={email && password && username && phoneNumber && address? false : true}
        >
          Sign up
        </button>
        <Link to="/login"
          className="link-btn"
         
        >
          Already have an account? Login here.
        </Link>
        <div className="back">
          <CaretLeftOutlined style={{ marginTop: "4px" }} /> Go back
        </div>
      </div>
    </>
  );
};

export default Register;
