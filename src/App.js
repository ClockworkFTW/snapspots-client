import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route as PublicRoute,
} from "react-router-dom";
import styled from "styled-components";
import bg from "./assets/bg1.png";

// Actions
import { userInitAction } from "./reducers/user";

// Routes
import PrivateRoute from "./routes/PrivateRoute";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Landing from "./routes/Landing";
import About from "./routes/About";
import SpotExplorer from "./routes/SpotExplorer";
import SpotSearch from "./routes/SpotSearch";
import SpotEditor from "./routes/SpotEditor";
import SpotDetails from "./routes/SpotDetails";
import SpotPhotos from "./routes/SpotPhotos";
import Profile from "./routes/Profile";

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
            <SpotSearch />
          </PublicRoute>
          {/* <PublicRoute path="/spot/explore" exact>
            <SpotExplorer />
          </PublicRoute> */}
          <PrivateRoute path="/spot/edit/:spot_id">
            <SpotEditor />
          </PrivateRoute>
          <PublicRoute path="/spot/photos/:spot_id">
            <SpotPhotos />
          </PublicRoute>
          <PublicRoute path="/spot/:spot_id">
            <SpotDetails />
          </PublicRoute>
          <PrivateRoute path="/profile/:user_id">
            <Profile />
          </PrivateRoute>
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
  background-image: url(${bg});
  background-attachment: fixed;
  background-size: 500px 500px;
  background-repeat: true;
`;

export default App;
