import {
  CaretLeftOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import "../styles/Login.scss";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Login</div>
        <div className="text">Email or username :</div>
        <input
          type="text"
          placeholder="Email or username"
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
        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
        >
          Login
        </button>
        <button
          className="link-btn"
          onClick={() => props.onFormSwitch("register")}
        >
          Don't have an account? Register here.
        </button>
        <div className="back">
          <CaretLeftOutlined style={{ marginTop: "4px" }} /> Go back
        </div>
      </div>
    </>
  );
};

export default Login;
