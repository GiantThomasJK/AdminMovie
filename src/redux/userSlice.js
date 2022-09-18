import produce from "immer";
import { SET_USER, SET_USER_DETAIL } from "./userAction";
const initialState = {
  users: null,
  userDetail: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return produce(state, (draft) => {
        draft.users = action.payload;
      });
    }
    case SET_USER_DETAIL: {
      return produce(state, (draft) => {
        draft.userDetail = action.payload;
      });
    }

    default:
      return state;
  }
};

export default reducer;
