import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Landing = () => (
  <Container>
    <Welcome>
      Welcome to SnapSpots! We'll help you find great places to take photos,
      anywhere in the world.
    </Welcome>
    <Link to="/home">get started</Link>
  </Container>
);

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Welcome = styled.p``;

export default Landing;
