import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Thêm useSelector
import "../../styles/home.scss";
import { Header, Login, Register, UserProfile, Logout } from "../../components";
import Main from "../../components/Main/Main";
import Cart from "../../components/Cart/Cart";
// import AdminPanel from "../administration/AdminPanel";

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Sử dụng useSelector
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  return (
    <div>
      <div className="home-1">
        <div className="container-1">
          <div className="navbar-1">
            <Header onLinkClick={(path) => navigate(path)} />
          </div>
        </div>
      </div>
      <div className="home-2">
        <Routes>
          {isAuthenticated ? ( // Sử dụng trạng thái đăng nhập từ Redux
            <>
              <Route path="/home" element={<Main />} />
              <Route path="/cart" element={<Cart />} />
              {userInfo && (
                <Route
                  path="/user-profile"
                  element={<UserProfile user={userInfo} />}
                />
              )}

              <Route path="/logout" element={<Logout />} />
              {/* Các route khác sau khi đăng nhập */}
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Các route khác khi chưa đăng nhập */}
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;