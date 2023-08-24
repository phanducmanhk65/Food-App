import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/home.scss";
import { Header, Login, Register, UserProfile, Logout } from "../../components";
import Main from "../../components/Main/Main";
import Cart from "../../components/Cart/Cart";
import { authenticateFromToken } from "../../store/action/authAction";
import AdminPanel from "../administration/AdminPanel";
import ShipperPage from "../shipper/ShipperPage"; // Đảm bảo đường dẫn chính xác

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  useEffect(() => {
    dispatch(authenticateFromToken());
  }, [dispatch]);

  return (
    <div>
      {!location.pathname.includes("/admin-panel") &&
        !location.pathname.includes("/shipper-page") && (
          <div className="home-1">
            <div className="container-1">
              <div className="navbar-1">
                <Header onLinkClick={(path) => navigate(path)} />
              </div>
            </div>
          </div>
        )}
      <div className="home-2">
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/home" element={<Main />} />
              <Route path="/cart" element={<Cart />} />
              {userInfo && (
                <Route
                  path="/user-profile"
                  element={<UserProfile user={userInfo} />}
                />
              )}
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/shipper-page" element={<ShipperPage />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;