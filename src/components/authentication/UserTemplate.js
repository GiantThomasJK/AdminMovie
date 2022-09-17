import React, { Fragment } from "react";
import { Route } from "react-router-dom";

function UserTemplate(props) {
  const { Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>

          </Fragment>
        );
      }}
    />
  );
}

export default UserTemplate;
