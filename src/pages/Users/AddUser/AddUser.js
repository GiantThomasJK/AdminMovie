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
import { useDispatch } from "react-redux";
import { uploadMoviesAction } from "redux/movieAction";
import { updateUsersAction, uploadUsersAction } from "redux/userAction";
import { Redirect, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddUser = () => {
  const { Option } = Select;

  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState(null);
  const { t, i18n } = useTranslation();
  let language = localStorage.getItem("i18nextLng");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  const dispatch = useDispatch();
  const history = useHistory();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    onSubmit: (values) => {
      values.maNhom = "GP01";
      console.log(values);
      handleAddUser(values);
      handleUpdateUser(values);
    },
  });

  const handleAddUser = async (user) => {
    await dispatch(uploadUsersAction(user));
  };

  const handleUpdateUser = async (user) => {
    await dispatch(updateUsersAction(user));
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    formik.setFieldValue("maLoaiNguoiDung", value);
  };

  if (!localStorage.getItem("USER_LOGIN")) {
    alert("Bạn không có quyền truy cập vào trang này, vui lòng đăng nhập !");
    return <Redirect to="/" />;
  }

  return (
    <>
      <button
        onClick={() => {
          history.push("/admin/users");
        }}
        type="submit"
        className="bg-blue-400 hover:bg-blue-600 text-white p-2"
      >
        {t("Back")}
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
        <h3 className="text-center text-4xl"> {t("Add user")}</h3>

        <div className="flex px-10 py-10 ">
          <div className="w-1/2 pl-24">
            <Form.Item label={t("Account")}>
              <Input name="taiKhoan" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label={t("Email")}>
              <Input name="email" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label={t("Password")}>
              <Input name="matKhau" onChange={formik.handleChange} />
            </Form.Item>
          </div>
          <div className="w-1/2 pr-24">
            <Form.Item label={t("Phonenumber")}>
              <Input name="soDt" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label={t("Fullname")}>
              <Input name="hoTen" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label={t("User type")}>
              <Select
                defaultValue="Khách hàng"
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
          <Form.Item
            labelAlign="left"
            labelCol={{
              span: 9,
            }}
            wrapperCol={{
              span: 24,
            }}
            label={t("Action")}
            className=""
          >
            <button
              onClick={() => handleAddUser}
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white p-2"
            >
              {t("Add user")}
            </button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <button
              onClick={() => handleUpdateUser}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2"
            >
              {t("Update")}
            </button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default AddUser;
