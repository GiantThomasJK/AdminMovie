import AdminTemplate from "assets/AdminTemplate/AdminTemplate";
import Login from "components/authentication/Login";
import UserTemplate from "components/authentication/UserTemplate";
import Dashboard from "pages/Admin/Dashboard";
import AddNew from "pages/Films/AddNew/AddNew";
import Edit from "pages/Films/Edit/Edit";
import Film from "pages/Films/Film";
import Showtime from "pages/Showtime/Showtime";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { fetchProfileAction } from "redux/authAction";
import "./App";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileAction);
  });
  return (
    <BrowserRouter>
      <Suspense>
        <Switch>
          <AdminTemplate path="/admin" exact Component={Dashboard} />
          <AdminTemplate path="/admin/films" exact Component={Film} />
          <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
          <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
          <AdminTemplate
            path="/admin/films/showtime/:id/:tenPhim"
            exact
            Component={Showtime}
          />
          <AdminTemplate path="/admin/login" exact Component={Login} />

          <AdminTemplate path="/admin/users" exact Component={Dashboard} />
          <AdminTemplate path="/admin/showtimes" exact Component={Showtime} />
          <AdminTemplate path="/" exact Component={Login} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
