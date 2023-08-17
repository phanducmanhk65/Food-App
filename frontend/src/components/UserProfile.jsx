import React from "react";
import UserInfoList from "./UserInfoList"; // Import component hiển thị thông tin người dùng

const UserProfile = (props) => {
  // Truy cập thông tin người dùng từ props
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log("props:", props);
  console.log("user:", userInfo);

  // console.log("props.location.state:", props.location.state);

  return (
    <div>
      <h2>User Profile</h2>
      {/* Hiển thị thông tin người dùng bằng component UserInfoList */}
      {userInfo && <UserInfoList userInfo={userInfo} />}
    </div>
  );
};

export default UserProfile;
