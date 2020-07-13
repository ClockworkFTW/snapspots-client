import React from "react";
import { Link as L } from "react-router-dom";
import styled from "styled-components";

const Header = () => (
  <Wrapper>
    <Container>
      <Logo to="/">SnapSpots</Logo>
      <Links>
        <Link to="/home">home</Link>
        <Link to="/create-spot">create</Link>
        <Link to="/sign-in">sign in</Link>
      </Links>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px 0;
`;

const Logo = styled(L)`
  text-decoration: none;
  font-size: 22px;
  font-weight: 700;
  color: black;
`;

const Links = styled.div``;

const Link = styled(L)`
  margin-left: 10px;
  text-decoration: none;
  color: black;
`;

export default Header;
