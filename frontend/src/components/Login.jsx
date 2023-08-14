import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"; // Import jwt_decode

import {
  CaretLeftOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "../styles/Login.scss";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/action/authAction";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Make the login API call
    axios
      .post(
        "http://localhost:3000/user/login",

        { username, password },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Login successful!", response.data);

        // Giải mã token để lấy thông tin người dùng
        const decodedToken = jwt_decode(response.data.token);
        console.log("User info:", decodedToken.userId);

        // Lấy thông tin chi tiết người dùng từ API
        const userId = decodedToken.userId;

        axios
          .get(`http://localhost:3000/user/${userId}`, {
            withCredentials: true,
          }) // Thay thế URL API thực tế của bạn
          .then((response) => {
            const userInfo = response.data;
            console.log("User details:", userInfo);

            // Lưu thông tin chi tiết người dùng vào state (userInfo)
            setUserInfo(userInfo);

            // Lưu thông tin người dùng vào Redux store
            dispatch(loginSuccess(decodedToken));

            // Lưu thông tin người dùng vào Local Storage
            localStorage.setItem("userInfo", JSON.stringify(userInfo));

            // Chuyển hướng đến trang UserProfile và truyền thông tin người dùng
            navigate("/user-profile", { state: { user: userInfo } });
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
        window.location.replace("/home");
      })
      .catch((error) => {
        console.error("Login failed:", error.response.data);
        setErrorMessage("Invalid username or password");
      });
  };

  return (
    <>
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
          onClick={handleLogin}>
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
    </>
  );
};

export default Login;
