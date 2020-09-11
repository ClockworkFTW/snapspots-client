import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route as PublicRoute,
} from "react-router-dom";
import styled from "styled-components";
import background from "./assets/topography2.png";

// Actions
import { userInitAction } from "./reducers/user";

// Routes
import PrivateRoute from "./routes/PrivateRoute";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Landing from "./routes/Landing";
import About from "./routes/About";
import SearchSpot from "./routes/SearchSpot";
import ExploreSpot from "./routes/ExploreSpot";
import CreateSpot from "./routes/CreateSpot";
import ViewSpot from "./routes/ViewSpot";

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
    dispatch(userInitAction());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Main>
        <Switch>
          <PublicRoute path="/" exact>
            <Landing />
          </PublicRoute>
          <PublicRoute path="/about">
            <About />
          </PublicRoute>
          <PublicRoute path="/sign-up">
            <SignUp />
          </PublicRoute>
          <PublicRoute path="/sign-in">
            <SignIn />
          </PublicRoute>
          <PublicRoute path="/spot/search" exact>
            <SearchSpot />
          </PublicRoute>
          <PublicRoute path="/spot/explore" exact>
            <ExploreSpot />
          </PublicRoute>
          <PrivateRoute path="/spot/create" exact>
            <CreateSpot />
          </PrivateRoute>
          <PublicRoute path="/spot/:spot_id">
            <ViewSpot />
          </PublicRoute>
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
};

const Main = styled.div`
  position: relative;
  flex: 1;
  /* background: #edf2f7; */
  background-image: url(${background});
`;

export default App;
