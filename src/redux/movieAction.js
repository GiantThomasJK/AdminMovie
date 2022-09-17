import instance from "api/instance";

export const actionTypes = {
  SET_MOVIES: "movies/SET_MOVIES",
  UPLOAD_MOVIES: "movies/UPLOAD_MOVIES",
  SET_MOVIES_DETAIL: "movies/SET_MOVIES_DETAIL",
  UPDATE_MOVIES: "movies/UPDATE_MOVIES",
  DELETE_MOVIES: "movies/DELETE_MOVIES",
  SEARCH_MOVIES: "movies/SEARCH_MOVIES",
};

export const fetchMoviesAction = (config, cb, tenPhim = "") => {
  return async (dispatch) => {
    try {
      const params = tenPhim != "" ? `&tenPhim=${tenPhim}` : "";
      const res = await instance.request({
        url: "api/QuanLyPhim/LayDanhSachPhim?maNhom=GP02" + params,
        method: "GET",
        params: {
          soTrang: config.currentPage,
          soPhanTuTrenTrang: config.pageSize,
        },
      });
      // setConfig({ ...config, totalCount: res.data.content.totalCount });
      cb(res.data.content.totalCount);
      dispatch({
        type: actionTypes.SET_MOVIES,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};

export const uploadMoviesAction = (formData) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/ThemPhimUploadHinh",
        method: "POST",
        data: formData,
      });

      console.log("call duoc r");

      // dispatch({
      //   type: actionTypes.UPLOAD_MOVIES,
      //   payload: res.data.content,
      // });
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchMoviesDeatil = (maPhim) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayThongTinPhim",
        method: "GET",
        params: {
          maPhim: maPhim,
        },
      });

      console.log(res.data.content);

      console.log("call duoc r");

      dispatch({
        type: actionTypes.SET_MOVIES_DETAIL,
        payload: res.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateMoviesAction = (formData) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/CapNhatPhimUpload",
        method: "POST",
        data: formData,
      });

      console.log(res.data.content);

      dispatch({
        type: actionTypes.UPDATE_MOVIES,
        payload: res.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteMovieAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/XoaPhim",
        method: "DELETE",
        params: {
          maPhim: maPhim,
        },
      });

      console.log(res.data.content);

      dispatch({
        type: actionTypes.DELETE_MOVIES,
        payload: res.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const searchMoviesAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "api/QuanLyPhim/LayDanhSachPhim",
        method: "GET",
        params: {
          maNhom: "GP01",
          tenPhim: tenPhim,
          // soTrang: config.currentPage,
          // soPhanTuTrenTrang: config.pageSize,
        },
      });
      dispatch({
        type: actionTypes.SET_MOVIES,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};

export const fecthMoviesTheaterAction = async () => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
      // params: {
      //   maHeThongRap: maHeThongRap,
      // },
    });
    return res.data.content;
  } catch (err) {}
};

export const fecthMoviesTheaterCluster = async (maHeThongRap) => {
  try {
    const res = await instance.request({
      url: "api/QuanLyRap/LayThongTinCumRapTheoHeThong",
      method: "GET",
      params: {
        maHeThongRap: maHeThongRap,
      },
    });
    return res.data.content;
  } catch (err) {}
};

export const createScheduleTheater = async (shedule) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyDatVe/TaoLichChieu",
      method: "POST",
      params: {
        lich: shedule,
      },
    });
    return res.data.content;
  } catch (err) {}
};
