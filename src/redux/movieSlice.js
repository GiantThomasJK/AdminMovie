import produce from "immer";
import { actionTypes } from "./movieAction";

const initialState = {
  movies: null,
  uploadMovies: null,
  moviesDetail: null,
  updateMovies: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MOVIES: {
      return produce(state, (draft) => {
        draft.movies = action.payload;
      });
    }

    case actionTypes.SET_MOVIES_DETAIL: {
      return produce(state, (draft) => {
        draft.moviesDetail = action.payload;
      });
    }

    default:
      return state;
  }
};

export default reducer;
