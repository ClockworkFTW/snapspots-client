import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route as PublicRoute,
} from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import Header from "./components/Header";
import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Landing from "./routes/Landing";
import CreateSpot from "./routes/CreateSpot";

const App = () => (
  <Router>
    <Header />
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
  </Router>
);

export default App;
