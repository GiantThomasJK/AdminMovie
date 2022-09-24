import { Button, Table } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { Input, Space } from "antd";
import {
  AudioOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovieAction,
  fetchMoviesAction,
  searchMoviesAction,
} from "redux/movieAction";
import { NavLink, useHistory } from "react-router-dom";
import { deleteUsersAction, fetchUserListAction } from "redux/userAction";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";

const { Search } = Input;

function User() {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedUser = useSelector((state) => state.users.users);
  const { t, i18n } = useTranslation();
  let language = localStorage.getItem("i18nextLng");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  const [config, setConfig] = useState({
    currentPage: 1,
    pageSize: 4,
    totalCount: 0,
  });

  const changeTotalCount = (total) => {
    setConfig({ ...config, totalCount: total });
  };

  const fetchUser = async () => {
    await dispatch(fetchUserListAction(""));
  };

  const onSearch = (value) => {
    dispatch(fetchUserListAction(value));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const columns = [
    {
      title: `${t("Account")}`,
      dataIndex: "taiKhoan",
      value: (text, object) => {
        return <span>{text}</span>;
      },

      sorter: (a, b) => a.taiKhoan - b.taiKhoan,
      sortDirections: ["descend"],
      width: "10%",
    },
    {
      title: `${t("Password")}`,
      dataIndex: "matKhau",
      value: (text, object) => {
        return <span>{text}</span>;
      },

      sorter: (a, b) => a.taiKhoan - b.taiKhoan,
      sortDirections: ["descend"],
      width: "10%",
    },
    {
      title: `${t("Fullname")}`,
      dataIndex: "hoTen",
      render: (text, film) => {
        return <span>{text}</span>;
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        let tenPhimA = a.hoTen.toLowerCase().trim();
        let tenPhimB = b.hoTen.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      width: "12%",
    },
    {
      title: `${t("Email")}`,
      dataIndex: "email",
      sorter: (a, b) => {
        let tenPhimA = a.email.toLowerCase().trim();
        let tenPhimB = b.email.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      width: "15%",
    },
    {
      title: `${t("Phonenumber")}`,
      dataIndex: "soDt",
      sorter: (a, b) => {
        let tenPhimA = a.soDT.toLowerCase().trim();
        let tenPhimB = b.soDT.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      render: (text, film) => {
        return <span>{text}</span>;
      },
      sortDirections: ["descend", "ascend"],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      width: 200,
    },
    {
      title: `${t("User type")}`,
      dataIndex: "maLoaiNguoiDung",
      sorter: (a, b) => {
        let tenPhimA = a.maLoaiNguoiDung.toLowerCase().trim();
        let tenPhimB = b.maLoaiNguoiDung.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      render: (text, film) => {
        return <span>{text}</span>;
      },
      sortDirections: ["descend", "ascend"],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      width: 200,
    },

    {
      title: `${t("Action")}`,
      dataIndex: "hanhdong",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className="mr-4 text-2xl"
              onClick={() => {
                localStorage.setItem("userDetail", JSON.stringify(film));
              }}
              to={`/admin/users/edit/${film.taiKhoan}`}
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="mr-4 text-2xl"
              onClick={() => {
                swal({
                  title: "Are you sure?",
                  text: "Are you sure that you want to delete this user?",
                  icon: "warning",
                  dangerMode: true,
                }).then((willDetele) => {
                  if (willDetele) {
                    dispatch(deleteUsersAction(film.taiKhoan));
                  }
                });

              }}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
            {/* <NavLink
              key={3}
              className="text-2xl"
              to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`}
              onClick={() => {
                localStorage.setItem("filmDetails", JSON.stringify(film));
              }}
            >
              <CalendarOutlined style={{ color: "green" }} />
            </NavLink> */}
          </Fragment>
        );
      },
    },
  ];
  const data = selectedUser;

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  return (
    <div>
      <h3 className="text-4xl"> {t("User management")}</h3>
      <Button
        className="mb-5"
        onClick={() => {
          history.push("/admin/users/addUser");
        }}
      >
        {t("Add user")}
      </Button>
      <Search
        className="mb-5"
        placeholder={t("Search your account or fullname")}
        size="large"
        suffix={suffix}
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
      />
      ;
    </div>
  );
}

export default User;
