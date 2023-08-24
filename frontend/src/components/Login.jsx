import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFail } from "../store/action/authAction";
import jwt_decode from "jwt-decode";
import {
  CaretLeftOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "../styles/Login.scss";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    axios
      .post(
        "http://localhost:3000/user/login",
        { username, password },
        { withCredentials: true }
      )
      .then((response) => {
        const decodedToken = jwt_decode(response.data.token);
        console.log("Ủa alo :", decodedToken);
        const userId = decodedToken.userId;
        dispatch(loginSuccess(decodedToken));
        localStorage.setItem("token", response.data.token);

        axios
          .get(`http://localhost:3000/user/${userId}`, {
            withCredentials: true,
          })
          .then((response) => {
            const userInfo = response.data;

            dispatch(loginSuccess(decodedToken));
            localStorage.setItem("userInfo", JSON.stringify(userInfo));

            navigate("/user-profile", { state: { user: userInfo } });
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
        // window.location.replace("/home");
      })
      .catch((error) => {
        console.error("Login failed:", error.response.data);
        dispatch(loginFail("Invalid username or password"));
      });
  };

  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">Login</div>
      <div className="text">Username :</div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
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
        className={username && password ? "active" : ""}
        disabled={username && password ? false : true}
        onClick={handleLogin}
      >
        Login
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Link to="/register" className="link-btn">
        Don't have an account? Register here.
      </Link>
      <div className="back">
        <CaretLeftOutlined style={{ marginTop: "4px" }} /> Go back
      </div>
    </div>
  );
};

export default Login;
