import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route as PublicRoute,
} from "react-router-dom";
import styled from "styled-components";

import { userInit } from "./reducers/user";

import PrivateRoute from "./routes/PrivateRoute";
import Header from "./components/Header";
import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Landing from "./routes/Landing";
import CreateSpot from "./routes/CreateSpot";
import Footer from "./components/Footer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userInit());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Main>
        <Switch>
          <PublicRoute path="/" exact>
            <Landing />
          </PublicRoute>
          <PublicRoute path="/sign-up">
            <SignUp />
          </PublicRoute>
          <PublicRoute path="/sign-in">
            <SignIn />
          </PublicRoute>
          <PublicRoute path="/home">
            <Home />
          </PublicRoute>
          <PrivateRoute path="/create-spot">
            <CreateSpot />
          </PrivateRoute>
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
};

const Main = styled.div`
  flex: 1;
`;

export default App;
