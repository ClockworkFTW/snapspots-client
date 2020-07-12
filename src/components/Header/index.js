import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => (
  <Container>
    <Link to="/">SnapSpots</Link>
    <Link to="/home">home</Link>
    <Link to="/sign-in">sign in</Link>
    <Link to="/sign-up">sign up</Link>
  </Container>
);

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export default Header;
