import React, { useState } from "react";
import "../../styles/AdminPanel.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import CrudUser from "./CrudUser";
import CrudVoucher from "./CrudVoucher";
import CrudDishesManagement from "./CrudDishesManagement";
import OrderStatus from "./OrderStatus";
import HomePage from "../Home/HomePage";

const { Sider, Content } = Layout;

function AdminPanel() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [currentPage, setCurrentPage] = useState("dishes");

  const renderPageContent = () => {
    switch (currentPage) {
      case "dishes":
        return <CrudDishesManagement />;
      case "order":
        return <OrderStatus />;
      case "user":
        return <CrudUser />;
      case "return":
        return <HomePage />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => {
            if (key === "return") {
              navigate("/home"); // Chuyển hướng về trang Home khi ấn "Return"
            } else {
              setCurrentPage(key);
            }
          }}
          items={[
            {
              key: "dishes",
              icon: <ShopOutlined />,
              label: "Dishes",
            },
            {
              key: "order",
              icon: <UnorderedListOutlined />,
              label: "Order",
            },
            {
              key: "user",
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
        </Header>
        <Content
          style={{
            margin: "0",
            padding: "0",
            minHeight: "100vh",
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
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminPanel;
