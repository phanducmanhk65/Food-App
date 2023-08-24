import React, { useState } from "react";
import "../../styles/AdminPanel.scss";
import {
  EnvironmentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  LogoutOutlined,
  LoginOutlined,
  CarOutlined,
  ArrowLeftOutlined, // Thêm biểu tượng ArrowLeftOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import MapContainer from "./MapContainer";
import OrdersProcessing from "./OrdersProcessing";
import OrdersWaiting from "./OrdersWaiting";
import { Routes, Route, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

function ShipperPage() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [currentPage, setCurrentPage] = useState("map");

  const renderPageContent = () => {
    switch (currentPage) {
      case "map":
        return (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "500px",
            }}
          >
            <MapContainer />
          </div>
        );
      case "order":
        return (
          <div style={{ flex: 1 }}>
            <OrdersWaiting />
          </div>
        );
      case "ondoing":
        return (
          <div style={{ flex: 1 }}>
            <OrdersProcessing />
          </div>
        );
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
              key: "map",
              icon: <EnvironmentOutlined />,
              label: "Map",
            },
            {
              key: "order",
              icon: <ShopOutlined />,
              label: "Order",
            },
            {
              key: "ondoing",
              icon: <CarOutlined />,
              label: "On doing",
            },
            {
              key: "return", // Thay đổi key để phù hợp với trường hợp "Return"
              icon: <ArrowLeftOutlined />, // Sử dụng biểu tượng ArrowLeftOutlined
              label: "Return", // Thay đổi nhãn để hiển thị "Return"
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
          {renderPageContent()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default ShipperPage;
