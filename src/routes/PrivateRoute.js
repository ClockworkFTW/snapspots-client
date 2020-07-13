import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ path, children }) => {
  const user = useSelector((state) => state.user.data);
  return (
    <Route path={path}>{user ? children : <Redirect to="/sign-in" />}</Route>
  );
};

export default PrivateRoute;
