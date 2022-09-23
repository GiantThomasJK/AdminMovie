import React, { Fragment } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Select } from "antd";
import { useState, useNavigate } from "react";
import { NavLink, Redirect, Route, useHistory } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import Background from "assets/img/BG1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { SET_PROFILE } from "redux/authAction";
import { useTranslation } from "react-i18next";

function AdminTemplate(props) {
  const { Header, Content, Footer, Sider } = Layout;
  const { Component, ...restProps } = props;
  let user = {};
  const userProfile = useSelector((state) => state.auth.profile);
  const history = useHistory();
  const dispatch = useDispatch();
  const { Option } = Select;
  const { t, i18n } = useTranslation();

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("USER_LOGIN");
    localStorage.removeItem("filmDetails");
    dispatch({
      type: SET_PROFILE,
      payload: null,
    });

    history.push("/");
  };

  const handleLanguage = (value) => {
    i18n.changeLanguage(value);
    console.log(value);
  };



  const renderUserProfile = () => {
    if (localStorage.getItem("USER_LOGIN")) {
      user = JSON.parse(localStorage.getItem("USER_LOGIN"));
      return (
        <>
          <a className="ml-3" style={{ color: "white" }} href="#">
            {t("Hi")}, {user.hoTen}
          </a>
          <a
            style={{ color: "white" }}
            className="mr-5 pointer-events-auto ml-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
            href="#"
            onClick={handleLogout}
          >
            {t("Log out")}
          </a>
        </>
      );
    }

    return (
      <>
        <a
          className="mr-5 pointer-events-auto ml-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
          href="#"
        >
          {t("Sign in")}
        </a>
        {/* <a
          style={{ color: "white" }}
          className="mr-5 pointer-events-auto ml-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
          href="#"
          onClick={handleLogout}
        >
          Log out
        </a> */}
      </>
    );
  };

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
                    <NavLink to="/admin/users">{t("User")}</NavLink>
                  </Menu.Item>
                  <SubMenu key="sub1" icon={<FileOutlined />} title={t("Films")}>
                    <Menu.Item
                      key="/admin/films"
                      icon={<VideoCameraOutlined />}
                    >
                      <NavLink to="/admin/films">{t("Films")}</NavLink>
                    </Menu.Item>
                    <Menu.Item
                      key="/admin/films/addnew"
                      icon={<VideoCameraOutlined />}
                    >
                      <NavLink to="/admin/films/addnew">
                        {t("Add Film")}
                      </NavLink>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="/admin/showtimes" icon={<TeamOutlined />}>
                    <NavLink to="/admin/showtimes">{t("Showtime")}</NavLink>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="text-right"
                  style={{
                    padding: 0,
                  }}
                >
                  {" "}
                  <Select
                    className="mr-5"
                    onChange={handleLanguage}
                    defaultValue="en"
                    style={{
                      width: 70,
                    }}
                  >
                    <Option value="en">Eng</Option>
                    <Option value="vi">VIE</Option>
                  </Select>
                  {renderUserProfile()}
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
