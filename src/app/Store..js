import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import movieReducer from "redux/movieSlice";
import authReducer from "redux/authSlice";
import userReducer from "redux/userSlice"
const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
  users: userReducer,
});

const logger = (state) => {
  return (next) => {
    return (action) => {
      //xu ly action
      const actionList = localStorage.getItem("actionList");
      if (!actionList) {
        localStorage.setItem(actionList, JSON.stringify([action]));
      } else {
        const actionListArr = JSON.parse(actionList);
        actionListArr.push(action);
        localStorage.setItem("actionList", JSON.stringify(actionListArr));
      }
      // const newAction = {
      //   type: action.type,
      //   payload: {},
      // };
      // console.log(action);
      // console.log("logger");
      next(action);
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;
