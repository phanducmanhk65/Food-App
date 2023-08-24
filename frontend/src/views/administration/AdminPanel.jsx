import React, { useState } from "react";
import "../../styles/AdminPanel.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import CrudUser from "./CrudUser";
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
              key: "return",
              icon: <LogoutOutlined />,
              label: "Return",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "0",
            padding: "0",
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          {renderPageContent()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminPanel;
