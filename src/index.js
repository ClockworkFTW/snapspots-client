import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import "reset-css";

import App from "./App";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans JP', sans-serif;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
