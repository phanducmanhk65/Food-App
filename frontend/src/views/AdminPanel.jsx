import React, { useState } from "react";
import "./../styles/AdminPanel.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import CrudApp from "./CrudApp";
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
              key: "/home",
              icon: <HomeOutlined />,
              label: "Home",
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
            }}
          />
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
              path="/home"
              element={<div>Nội dung Nav 1</div>}
            ></Route>

            <Route
              exact
              path="/order"
              element={<div>Nội dung Nav 2</div>}
            ></Route>

            <Route
              exact
              path="/user"
              element={
                <div>
                  <CrudApp />
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
