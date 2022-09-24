import instance from "api/instance";
import swal from "sweetalert";

export const SET_USER = "user/SET_USER";
export const SET_USER_DETAIL = "user/SET_USER_DETAIL";
export const UPLOAD_USER = "user/UPLOAD_USER";
export const UPDATE_USER = "user/UPDATE_USER";
export const DELETE_USER = "user/DELETE_USER";


export const fetchUserListAction = (tuKhoa = "") => {
  return async (dispatch) => {
    try {
      const params = tuKhoa != "" ? `&tuKhoa=${tuKhoa}` : "";
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=1&soPhanTuTrenTrang=10" + params,
        method: "GET",
      });

      dispatch({
        type: SET_USER,
        payload: res.data.content.items,
      });
      console.log("UserList ", res.data.content.items);
    } catch (err) {
      console.log(err);
    }
  };
};
export const fetchUserDetailAction = (tuKhoa = "") => {
  return async (dispatch) => {
    try {
      const params = tuKhoa != "" ? `&tuKhoa=${tuKhoa}` : "";
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01" + params,
        method: "GET",
      });

      dispatch({
        type: SET_USER_DETAIL,
        payload: res.data.content,
      });
      console.log("UserList ", res.data.content);
    } catch (err) {
      console.log(err);
    }
  };
};

export const uploadUsersAction = (userData) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: userData,
      });

      dispatch({
        type: UPLOAD_USER,
        payload: res.data.content,
      });

      if(res.data.statusCode === 200){
        swal({
          title: "Uploaded!",
          text: "User Uploaded Successfully",
          icon: "success",
          button: "OK",
        })
      }


    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUsersAction = (userData) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "POST",
        data: userData,
      });

      dispatch({
        type: UPDATE_USER,
        payload: res.data.content,
      });

      if(res.data.statusCode === 200){
        swal({
          title: "Updated!",
          text: "User Updated Successfully",
          icon: "success",
          button: "OK",
        })
      }

    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUsersAction = (TaiKhoan) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/XoaNguoiDung",
        method: "DELETE",
        params: {
          TaiKhoan: TaiKhoan,
        }

      });

      dispatch({
        type: UPDATE_USER,
        payload: res.data.content,
      });

      if(res.data.statusCode === 200){
        swal({
          title: "Deleted!",
          text: "User Deleted Successfully",
          icon: "success",
          button: "OK",
        })
      }

    } catch (err) {
      console.log(err);
    }
  };
};
