import {
  CaretLeftOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import "../styles/Login.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
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

  const handleSubmit = () => {
    const userData = {
      name: name,
      username: username,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
    };

    axios
      .post(
        "https://backend-cvjhefcki-phanducmanhk65.vercel.app/user/signup",
        userData
      )
      .then((response) => {
        // Xử lý kết quả trả về từ API (nếu cần)
        if (response.status === 201) {
          alert("Đăng ký thành công!");
          // Chuyển hướng đến trang đăng nhập
          window.location.replace("/login");
        }
      })
      .catch((error) => {
        alert("Thất bại");
        // Xử lý lỗi (nếu có)
        console.error(error);
      });
  };
  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Sign Up</div>
        <div className="text">Full Name :</div>
        <input
          type="text"
          placeholder="Full Name "
          value={name}
          onChange={handleNameChange}
        ></input>
        <div className="text">Username :</div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
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
          onClick={handleSubmit}
          className={
            name && password && username && phoneNumber && address
              ? "active"
              : ""
          }
          disabled={
            name && password && username && phoneNumber && address
              ? false
              : true
          }
        >
          Sign up
        </button>
        <Link to="/login" className="link-btn">
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
