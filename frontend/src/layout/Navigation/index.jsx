import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  SettingOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          zIndex: 1000
        }}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/" />
            Accueil
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/customer">Utilisateurs</Link>
          </Menu.Item>
          <Menu.Item key="32" icon={<TeamOutlined />}>
            <Link to="/Posts" />
            Gestion de musique
          </Menu.Item>
          <Menu.Item key="33" icon={<TeamOutlined />}>
            <Link to="/licenses" />
            Abonnements
          </Menu.Item>
          <Menu.Item key="31" icon={<TeamOutlined />}>
            <Link to="/admin" />
            Gestion des administrateurs
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}
export default Navigation;
