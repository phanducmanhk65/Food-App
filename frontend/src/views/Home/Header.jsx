import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLinksCenter, navLinksRight } from "../../constants";
import { connect } from "react-redux";
import { Layout, Menu, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import LogoUrl from "../../assets/LogoSota";
import "../../styles/header.scss";

const { Header: AntdHeader } = Layout;

const Header = ({ numberCart }) => {
  const navigate = useNavigate();

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
        {navLinksRight.map((nav, index) => (
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
        ))}
      </Menu>
    </AntdHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    numberCart: state._todoDish.numberCart,
  };
};

export default connect(mapStateToProps)(Header);
