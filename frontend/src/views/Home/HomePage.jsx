import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // Đảm bảo đã import useNavigate từ react-router-dom
import "../../styles/home.scss";
import {
  Navbar,
  Login,
  Register,
  SearchPage,
  UserProfile,
} from "../../components";
import Main from "../../components/Main/Main";
import Cart from "../../components/Cart/Cart";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {" "}
      <div className="home-1">
        <div className="container-1">
          <div className="navbar-1">
            <Navbar onLinkClick={(path) => navigate(path)} />
          </div>
        </div>
      </div>
      <div className="home-2">
        <Routes>
          <Route path="/home" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </>
  );
};

export default HomePage;
