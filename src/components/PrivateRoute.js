import React from "react";
import { Route, Redirect } from "react-router-dom";
import cookie from "react-cookies";

function PrivateRoute({ component: Component, ...rest }) {
  const token = cookie.load("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
