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

const Header = ({ numberCart, isAuthenticated, GetNumberCart }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi action GetNumberCart để cập nhật numberCart từ Redux store
    GetNumberCart();
  }, [GetNumberCart]);

  const handleLogout = () => {
    // Gọi action logout để đăng xuất
    logout();
    navigate("/login"); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
  };

  const userMenu = (
    <Menu>
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
          <Menu.Item key="user-dropdown" className="nav-item">
            <Dropdown overlay={userMenu} placement="bottomRight" arrow>
              <a href="/">
                <UserOutlined /> User
              </a>
            </Dropdown>
          </Menu.Item>
        ) : (
          navLinksRight.map((nav, index) => (
            <Menu.Item key={nav.id} className="nav-item">
              <Link to={`/${nav.id}`} onClick={() => navigate(`/${nav.id}`)}>
                {index === 1 ? (
                  <Badge count={numberCart} offset={[8, -8]}>
                    <ShoppingCartOutlined /> {nav.title}
                  </Badge>
                ) : (
                  nav.title
                )}
              </Link>
            </Menu.Item>
          ))
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
