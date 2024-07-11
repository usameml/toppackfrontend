import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { PlusOutlined, UnorderedListOutlined, AppstoreOutlined, DashboardOutlined, LineChartOutlined, DollarCircleOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh', direction: 'rtl' }}>
      <Header>
        <div className="logo" style={{ float: 'left', color: 'white' }}>TOP PACK</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">لوحة القيادة</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UnorderedListOutlined />}>
            <Link to="/product-list">قائمة المنتجات</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<AppstoreOutlined />}>
            <Link to="/cliche-list">قائمة الكليشات</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PlusOutlined />}>
            <Link to="/add-product">إضافة منتج</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LineChartOutlined />}>
            <Link to="/weekly-statistics">الإحصائيات الأسبوعية</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<DollarCircleOutlined />}>
            <Link to="/finance">إدارة المالية</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
