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
} from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { uploadMoviesAction } from "redux/movieAction";
import {
  fetchUserDetailAction,
  fetchUserListAction,
  updateUsersAction,
  uploadUsersAction,
} from "redux/userAction";
import { useHistory } from "react-router-dom";

const EditUser = (props) => {
  const { Option } = Select;

  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState(null);
  const selectedUser = useSelector((state) => state.users.userDetail);
  let user = {};
  if(localStorage.getItem("userDetail")){
    user = JSON.parse(localStorage.getItem("userDetail"))
  }

  const dispatch = useDispatch();
  const history = useHistory();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    let { email } = props.match.params;
    dispatch(fetchUserDetailAction(email));
  }, []);

  const formik = useFormik({
    initialValues: {
      taiKhoan: user?.taiKhoan,
      matKhau: user?.matKhau,
      email: user?.email,
      soDT: user?.soDt,
      maNhom: user?.maNhom,
      maLoaiNguoiDung: user?.maLoaiNguoiDung,
      hoTen: user?.hoTen,
    },
    onSubmit: (values) => {
      values.maNhom = "GP01";
      handleUpdateUser(values);
    },
  });

  const handleUpdateUser = async (user) => {
    await dispatch(updateUsersAction(user));
  };

  const handleChange = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };

  return (
    <>
      <button
        onClick={() => {
          history.push("/admin/users");
        }}
        type="submit"
        className="bg-blue-400 hover:bg-blue-600 text-white p-2"
      >
        Trở về
      </button>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 17,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3 className="text-center text-4xl">Cập nhật người dùng</h3>

        <div className="flex px-10 py-10 ">
          <div className="w-1/2 pl-24">
            <Form.Item label="Tài khoản">
              <Input
                value={formik.values.taiKhoan}
                name="taiKhoan"
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item label="Mật Khẩu">
              <Input
                value={formik.values.matKhau}
                name="matKhau"
                onChange={formik.handleChange}
              />
            </Form.Item>
          </div>
          <div className="w-1/2 pr-24">
            <Form.Item label="Số điện thoại">
              <Input
                value={formik.values.soDT}
                name="soDT"
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item label="Họ tên">
              <Input
                value={formik.values.hoTen}
                name="hoTen"
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item label="Loại người dùng">
              <Select
                defaultValue={formik.values.maLoaiNguoiDung}
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option name="maLoaiNguoiDung" value="KhachHang">
                  Khách hàng
                </Option>
                <Option name="maLoaiNguoiDung" value="QuanTri">
                  Quản trị
                </Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="flex flex-row flex-nowrap justify-center item-center ">
          {/* <Form.Item
            labelAlign="left"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 24,
            }}
            label="Tác vụ "
            className="px-2"
          >
            <button
              onClick={() => handleAddUser}
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white p-2"
            >
              Thêm người dùng
            </button>
          </Form.Item> */}
          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <button
              onClick={() => handleUpdateUser}
              type="submit"
              className=" text-1xl bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
            >
              Cập nhật
            </button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default EditUser;
