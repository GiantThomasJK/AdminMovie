import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { Cascader } from "antd";
import {
  createScheduleTheater,
  fecthMoviesTheaterAction,
  fecthMoviesTheaterCluster,
} from "redux/movieAction";
import { useFormik } from "formik";
import moment from "moment";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function Showtime(props) {
  const history = useHistory();
  let { id } = props.match.params;
  const formik = useFormik({
    initialValues: {
      maPhim: id * 1,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },

    onSubmit: async (values) => {
      try {
        const result = await createScheduleTheater(values);
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (!localStorage.getItem("USER_LOGIN")) {
    swal({
      title: "Warning!",
      text: "Please login to continue action",
      icon: "warning",
      button: "OK",
    });
    history.push("/");
  }

  const handleChangeHeThongRap = async (value) => {
    try {
      let result = await fecthMoviesTheaterCluster(value);
      setState({
        ...state,
        cumRapChieu: result,
      });
    } catch (err) {}
  };

  const handleChangeCumRap = async (value) => {
    formik.setFieldValue("maRap", value);
  };

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  const convertSelectHTR = () => {
    return state.heThongRapChieu?.map((htr, index) => {
      return {
        label: htr.tenHeThongRap,
        value: htr.maHeThongRap,
      };
    });
  };

  const convertSelectCR = () => {
    return state.cumRapChieu?.map((cr, index) => {
      return {
        label: cr.tenCumRap,
        value: cr.maCumRap,
      };
    });
  };

  useEffect(() => {
    async function fetchTheater() {
      try {
        let result = await fecthMoviesTheaterAction();

        setState({
          ...state,
          heThongRapChieu: result,
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchTheater();
  }, []);

  const onOk = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeDate = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  let film = {};
  if (localStorage.getItem("filmDetails")) {
    film = JSON.parse(localStorage.getItem("filmDetails"));
  }

  return (
    <>
      {" "}
      <button
        onClick={() => {
          history.push("/admin/films");
        }}
        type="submit"
        className="bg-blue-400 hover:bg-blue-600 text-white p-2"
      >
        Trở về
      </button>
      <div className="container">
        <div className="text-center mb-10">
          <h3 className="text-4xl ">
            Tạo lịch chiếu - {props.match.params.tenPhim}
          </h3>
        </div>
        <Form
          onSubmitCapture={formik.handleSubmit}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <div className="flex items-center justify-items-center">
            <div className="flex flex-col justify-items-center items-center flex-auto w-4">
              <div className="flex justify-items-center items-center">
                <img src={film.hinhAnh} alt="" width={250} height={250} />
              </div>
            </div>
            <div className="mt-10 flex-auto ">
              <Form.Item label="Hệ thống rạp">
                <Select
                  options={convertSelectHTR()}
                  onChange={handleChangeHeThongRap}
                  placeholder="Chọn hệ thống rạp"
                />
              </Form.Item>

              <Form.Item label="Cụm rạp">
                <Select
                  options={convertSelectCR()}
                  onChange={handleChangeCumRap}
                  placeholder="Chọn cụm rạp"
                />
              </Form.Item>

              <Form.Item label="Ngày chiếu giờ chiếu">
                <DatePicker
                  format="DD/MM/YYYY hh:mm:ss"
                  showTime
                  onChange={onChangeDate}
                  onOk={onOk}
                />
              </Form.Item>

              <Form.Item label="Giá vé">
                <InputNumber
                  min={75000}
                  max={150000}
                  onChange={onChangeInputNumber}
                />
              </Form.Item>

              <Form.Item label="Chức năng">
                <Button htmlType="submit">Tạo lịch chiếu</Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Showtime;
