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
const { Header, Sider, Content } = Layout;

function AdminPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedNav, setSelectedNav] = useState("1");

  const handleMenuClick = (key) => {
    setSelectedNav(key);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedNav]}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "2",
              icon: <UnorderedListOutlined />,
              label: "Order",
            },
            {
              key: "3",
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
          {selectedNav === "1" && <div></div>}
          {selectedNav === "2" && <div>Nội dung Nav 2</div>}
          {selectedNav === "3" && (
            <div>
              <CrudApp />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminPanel;
