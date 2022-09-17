import React, { Fragment } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { useState, useNavigate } from "react";
import { NavLink, Route, useHistory } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import Background from "assets/img/BG.jpg";

function AdminTemplate(props) {
  const { Header, Content, Footer, Sider } = Layout;
  const { Component, ...restProps } = props;

  const history = useHistory();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout
              style={{
                minHeight: "100vh",
              }}
            >
              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
              >
                <div className="flex align-item-center justify-items-center items-center logo p-5">
                  <img
                    className=" h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="logo"
                  />
                  <h3 className="text-2xl mx-2 text-white mb-0">MoviesDGT</h3>
                </div>
                <Menu
                  style={{ marginTop: 23 }}
                  onClick={({ key }) => {
                    history.push(key);
                  }}
                  theme="dark"
                  defaultSelectedKeys={["1"]}
                  mode="inline"
                >
                  <Menu.Item key="/admin/users" icon={<UserOutlined />}>
                    <NavLink to="/admin/users">User</NavLink>
                  </Menu.Item>
                  <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
                    <Menu.Item
                      key="/admin/films"
                      icon={<VideoCameraOutlined />}
                    >
                      <NavLink to="/admin/films">Films</NavLink>
                    </Menu.Item>
                    <Menu.Item
                      key="/admin/films/addnew"
                      icon={<VideoCameraOutlined />}
                    >
                      <NavLink to="/admin/films/addnew">AddNew</NavLink>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="/admin/showtimes" icon={<TeamOutlined />}>
                    <NavLink to="/admin/showtimes">ShowTime</NavLink>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background lg:border-b dark:border-slate-50/[0.06]"
                  style={{
                    padding: 0,
                  }}
                >
                </Header>
                <Content
                  style={
                    {
                      // background: `url(${Background})`,
                      // backgroundPosition: "center",
                      // backgroundSize: "cover",
                      // backgroundRepeat: "no-repeat",
                      // background: "#0F172A",
                    }
                  }
                >
                  {/* <Breadcrumb
                    style={{
                      margin: "16px 0",
                    }}
                  >
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb> */}
                  <div
                    className="site-layout-background"
                    style={{
                      padding: 24,
                      minHeight: 360,
                    }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                {/* <Footer
                  style={{
                    textAlign: "center",
                  }}
                >
                  Ant Design ©2018 Created by Ant UED
                </Footer> */}
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
}

export default AdminTemplate;
