import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as L } from "react-router-dom";
import styled from "styled-components";

import { userSignOut } from "../../reducers/user";

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);

  const handleSignOut = () => dispatch(userSignOut());

  return (
    <Container>
      <Group>
        <Link to="/spot/explore">Explore</Link>
        <Link to="/spot/search">Search</Link>
        <Link to="/spot/create">Create</Link>
      </Group>
      <Group>
        <Logo to="/">SnapSpots</Logo>
      </Group>
      <Group>
        {user ? (
          <Button onClick={handleSignOut}>sign out</Button>
        ) : (
          <Group>
            <Link to="/about">About</Link>
            <Button to="/sign-up">Sign Up</Button>
            <Button to="/sign-in">Log In</Button>
          </Group>
        )}
      </Group>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(L)`
  text-decoration: none;
  font-size: 22px;
  font-weight: 900;
  color: #4299e1;
`;

const Link = styled(L)`
  margin-right: 30px;
  text-decoration: none;
  color: #2d3748;
  font-size: 14px;
  font-weight: 700;
  &:hover {
    color: #4299e1;
  }
`;

const Button = styled(L)`
  width: 80px;
  margin-left: 10px;
  text-decoration: none;
  color: #ffffff;
  padding: 12px 0;
  background: #4299e1;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  &:hover {
    opacity: 0.7;
  }
`;

export default Header;
