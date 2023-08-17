import React, { useState, useEffect } from "react";
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

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (userInfo) {
      // Thực hiện các xử lý liên quan đến thông tin người dùng (nếu cần)
    }
  }, [userInfo]);

  const handleLogin = () => {
    // Make the login API call
    axios
      .post(
        "https://backend-six-beryl.vercel.app/user/login",
        { username, password },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Login successful!", response.data);

        // Giải mã token để lấy thông tin người dùng
        const decodedToken = jwt_decode(response.data.token);
        console.log("User info:", decodedToken.userId);

        // Lưu token vào Local Storage
        localStorage.setItem("token", response.data.token);

        // Lấy thông tin chi tiết người dùng từ API
        const userId = decodedToken.userId;

        axios
          .get(
            `https://backend-cvjhefcki-phanducmanhk65.vercel.app/user/${userId}`,
            {
              withCredentials: true,
            }
          )
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
        dispatch(loginFail("Invalid username or password"));
      });
  };

  console.log("Error message:", errorMessage);
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
    </>
  );
};

export default Login;
