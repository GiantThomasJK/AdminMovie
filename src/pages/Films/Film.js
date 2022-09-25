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
import swal from "sweetalert";

const { Search } = Input;

function Film() {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedMovie = useSelector((state) => state.movies.movies);

  const [config, setConfig] = useState({
    currentPage: 1,
    pageSize: 4,
    totalCount: 0,
  });

  const changeTotalCount = (total) => {
    setConfig({ ...config, totalCount: total });
  };

  const fetchMovies = async () => {
    dispatch(fetchMoviesAction(config, changeTotalCount));
  };

  const onSearch = (value) => {
    dispatch(fetchMoviesAction(config, changeTotalCount, value));
  };

  if (!localStorage.getItem("USER_LOGIN")) {
    swal({
      title: "Warning!",
      text: "Please login to continue action",
      icon: "warning",
      button: "OK",
    });
    history.push("/")
  }

  useEffect(() => {
    fetchMovies();
  }, [config.currentPage]);

  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      value: (text, object) => {
        return <span>{text}</span>;
      },
      // filters: [
      //   {
      //     text: "Joe",
      //     value: "Joe",
      //   },
      //   {
      //     text: "Jim",
      //     value: "Jim",
      //   },
      //   {
      //     text: "Submenu",
      //     value: "Submenu",
      //     children: [
      //       {
      //         text: "Green",
      //         value: "Green",
      //       },
      //       {
      //         text: "Black",
      //         value: "Black",
      //       },
      //     ],
      //   },
      // ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend"],
      width: "10%",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      render: (text, film) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              width="100"
              height="100"
            />
          </Fragment>
        );
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
      width: "12%",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      width: "16%",
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      render: (text, film) => {
        return (
          <Fragment>
            {film.trailer.length > 50
              ? film.trailer.substr(0, 50) + "..."
              : film.trailer}
          </Fragment>
        );
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => a.film.trailer - b.film.trailer,
      width: "2%",
    },

    {
      title: "Mô Tả",
      dataIndex: "moTa",
      sorter: (a, b) => {
        let tenPhimA = a.moTa.toLowerCase().trim();
        let tenPhimB = b.moTa.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 80) + "..."
              : film.moTa}
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      width: 300,
    },
    {
      title: "Hành Động",
      dataIndex: "hanhDong",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className="mr-2 text-2xl"
              to={`/admin/films/edit/${film.maPhim}`}
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="mr-2 text-2xl"
              onClick={() => {
                swal({
                  title: "Are you sure?",
                  text: "Are you sure that you want to delete this movie?",
                  icon: "warning",
                  dangerMode: true,
                }).then((willDetele) => {
                  if (willDetele) {
                    dispatch(deleteMovieAction(film.maPhim));
                  }
                });
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
            <NavLink
              key={3}
              className="text-2xl"
              to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`}
              onClick={() => {
                localStorage.setItem("filmDetails", JSON.stringify(film));
              }}
            >
              <CalendarOutlined style={{ color: "green" }} />
            </NavLink>
          </Fragment>
        );
      },
    },
  ];
  const data = selectedMovie;

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
      <h3 className="text-4xl">Quản lý phim</h3>
      <Button
        className="mb-5"
        onClick={() => {
          history.push("/admin/films/addnew");
        }}
      >
        Thêm phim
      </Button>
      <Search
        className="mb-5"
        placeholder="Input search film"
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

export default Film;
