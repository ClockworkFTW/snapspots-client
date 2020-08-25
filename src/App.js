import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route as PublicRoute,
} from "react-router-dom";
import styled from "styled-components";

// Actions
import { userInit } from "./reducers/user";

// Routes
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Landing from "./routes/Landing";
import CreateSpot from "./routes/CreateSpot";
import SpotPage from "./routes/SpotPage";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
library.add(fas, far, fal);

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
          <PrivateRoute path="/spot/create" exact>
            <CreateSpot />
          </PrivateRoute>
          <PublicRoute path="/spot/:id">
            <SpotPage />
          </PublicRoute>
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
};

const Main = styled.div`
  flex: 1;
  padding: 40px 0;
  background: #edf2f7;
`;

export default App;
