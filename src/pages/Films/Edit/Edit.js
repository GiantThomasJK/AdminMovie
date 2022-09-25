import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Spin,
} from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesDeatil,
  updateMoviesAction,
  uploadMoviesAction,
} from "redux/movieAction";
import { Redirect, useHistory } from "react-router-dom";

const Edit = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  const selectedMovie = useSelector((state) => state.movies.moviesDetail);

  const [imgSrc, setImgSrc] = useState(null);
  const history = useHistory();
  const [img, setImg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;
    dispatch(fetchMoviesDeatil(id));
  }, []);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: selectedMovie?.maPhim,
      tenPhim: selectedMovie?.tenPhim,
      trailer: selectedMovie?.trailer,
      moTa: selectedMovie?.moTa,
      ngayKhoiChieu: selectedMovie?.ngayKhoiChieu,
      dangChieu: selectedMovie?.dangChieu,
      hot: selectedMovie?.hot,
      maNhom: "GP00",
      sapChieu: selectedMovie?.sapChieu,
      danhGia: selectedMovie?.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      values.maNhom = "GP00";
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      dispatch(updateMoviesAction(formData));
    },
  });

  if (!selectedMovie) {
    return <Spin />;
  }

  if (!localStorage.getItem("USER_LOGIN")) {
    alert("Bạn không có quyền truy cập vào trang này, vui lòng đăng nhập !");
    return <Redirect to="/" />;
  }

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChanngeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];


    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        setImg(e.target.result);
      };
    }

    formik.setFieldValue("hinhAnh", file);
  };

  return (
    <>
      <button
        onClick={() => {
          history.push("/admin/films");
        }}
        type="submit"
        className="bg-blue-400 hover:bg-blue-600 text-white p-2"
      >
        Trở về
      </button>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3 className="text-4xl text-center">Cập nhật</h3>

        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên Phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô Tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            format={"DD/MM/YYYY"}
            value={moment(formik.values.ngayKhoiChieu)}
            onChange={handleChangeDatePicker}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("dangchieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            onChange={handleChanngeInputNumber("danhGia")}
            min={1}
            value={formik.values.danhGia}
          />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} />
          <br />
          <img
            style={{ width: 150, height: 150 }}
            src={img === "" ? selectedMovie.hinhAnh : img}
            alt=""
          />
        </Form.Item>

        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-green-500 text-white p-2">
            Cập nhật film
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Edit;
