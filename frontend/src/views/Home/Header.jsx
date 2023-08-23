import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLinksCenter, navLinksRight } from "../../constants";
import { connect } from "react-redux";
import { Layout, Menu, Badge, Dropdown } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import LogoUrl from "../../assets/LogoSota";
import "../../styles/header.scss";
import { GetNumberCart } from "../../store/action/cartAction";
import { logout } from "../../store/action/authAction.js";

const { Header: AntdHeader } = Layout;

const Header = ({ numberCart, isAuthenticated, GetNumberCart, logout }) => {
  const navigate = useNavigate();
  console.log("isAuthenticated:", isAuthenticated);
  useEffect(() => {
    // Gọi action GetNumberCart để cập nhật numberCart từ Redux store
    GetNumberCart();
  }, [GetNumberCart]);

  const handleLogout = () => {
    // Không cần gọi action logout ở đây nữa
    navigate("/logout"); // Chuyển hướng đến trang Logout
  };
  const handleAdminPanel = () => {
    window.location.href = "/admin-panel"; // Chuyển đến trang AdminPanel
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="admin-panel" onClick={handleAdminPanel}>
        <a>
          <UserOutlined /> Admin Panel
        </a>
      </Menu.Item>
      <Menu.Item key="profile">
        <Link to="/user-profile">
          <UserOutlined /> Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntdHeader className="header-container">
      <div className="logo">
        <LogoUrl />
      </div>
      <Menu theme="dark" className="nav-container">
        {navLinksCenter.map((nav) => (
          <Menu.Item key={nav.id} className="nav-item">
            <Link to={`/${nav.id}`} onClick={() => navigate(`/${nav.id}`)}>
              {nav.title}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      <Menu theme="dark" className="nav-container">
        {isAuthenticated ? (
          <>
            <Menu.Item key="cart" className="nav-item">
              <Badge count={numberCart} offset={[8, -8]}>
                <Link to="/cart">
                  <ShoppingCartOutlined /> Cart
                </Link>
              </Badge>
            </Menu.Item>
            <Menu.Item key="user-dropdown" className="nav-item">
              <Dropdown overlay={userMenu} placement="bottomRight" arrow>
                <a href="/user-profile">
                  <UserOutlined /> User
                </a>
              </Dropdown>
            </Menu.Item>
          </>
        ) : (
          navLinksRight.find((nav) => nav.id === "login") && (
            <Menu.Item key="login" className="nav-item">
              <Link to="/login" onClick={() => navigate("/login")}>
                <UserOutlined /> Login
              </Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </AntdHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    numberCart: state.cart.numberCart,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { GetNumberCart, logout })(Header);