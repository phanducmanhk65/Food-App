import React, { useState } from "react";
import "../../styles/AdminPanel.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import CrudUser from "./CrudUser";
import CrudDishesManagement from "./CrudDishesManagement";
import OrderStatus from "./OrderStatus";
import Login from "../../components/Login";
import Register from "../../components/Register";
import { Routes, Route, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

function AdminPanel() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/dishes",
              icon: <ShopOutlined />,
              label: "Dishes",
            },
            {
              key: "/order",
              icon: <UnorderedListOutlined />,
              label: "Order",
            },
            {
              key: "/user",
              icon: <UserOutlined />,
              label: "User",
            },
            {
              key: "/",
              icon: <LogoutOutlined />,
              label: "Log out",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              marginTop: "1px",
            }}
          />

          <Menu
            style={{ padding: 0, float: "right" }}
            theme="light"
            mode="horizontal"
            onClick={({ key }) => navigate(key)}
            items={[
              {
                key: "/login",
                icon: <LoginOutlined />,
                label: "Log in",
              },
              {
                key: "/register",
                icon: <LogoutOutlined />,
                label: "Register",
              },
            ]}
          ></Menu>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route
              exact
              path="/dishes"
              element={
                <div>
                  <CrudDishesManagement />
                </div>
              }
            ></Route>

            <Route
              exact
              path="/order"
              element={
                <div>
                  <OrderStatus />
                </div>
              }
            ></Route>

            <Route
              exact
              path="/user"
              element={
                <div>
                  <CrudUser />
                </div>
              }
            ></Route>
            <Route
              exact
              path="/login"
              element={
                <div>
                  <Login />
                </div>
              }
            ></Route>
            <Route
              exact
              path="/register"
              element={
                <div>
                  <Register />
                </div>
              }
            ></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminPanel;
