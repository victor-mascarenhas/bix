"use client";
import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const { Sider } = Layout;

const Sidebar = () => {
  const router = useRouter();

  const handleMenuClick = ({ key }) => {
    if (key === "home") {
      router.push("/dashboard");
    } else if (key === "logout") {
      signOut();
    }
  };

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["home"]}
        style={{ height: "100%", borderRight: 0, paddingRight: "24px" }}
        onClick={handleMenuClick}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
