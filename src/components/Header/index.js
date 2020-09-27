import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as L } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.png";

import { userSignOut } from "../../reducers/user";

import { ProfileButton } from "../Profile";

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);

  const handleSignOut = () => dispatch(userSignOut());

  return (
    <Container>
      <Group>
        <Link to="/spot/explore">Explore</Link>
        <Link to="/spot/search">Search</Link>
        <Link to="/spot/edit/new">Create</Link>
      </Group>
      <Group>
        <Logo to="/">SnapSpots</Logo>
      </Group>
      <Group>
        {user ? (
          <Group>
            <Link to="/about">About</Link>
            <Button onClick={handleSignOut}>Sign Out</Button>
            <ProfileButton user={user} />
          </Group>
        ) : (
          <Group>
            <Link to="/about">About</Link>
            <Button to="/sign-up" type="fill">
              Sign Up
            </Button>
            <Button to="/sign-in">Log In</Button>
          </Group>
        )}
      </Group>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-decoration: none;
  font-size: 22px;
  font-weight: 900;
  color: #2d3748;
  &:hover {
    color: #ed8936;
  }
`;

const Link = styled(L)`
  margin-right: 30px;
  text-decoration: none;
  color: #2d3748;
  font-size: 14px;
  font-weight: 700;
  &:hover {
    color: #ed8936;
  }
`;

const Button = styled(L)`
  width: 80px;
  margin-left: 10px;
  text-decoration: none;
  color: ${({ type }) => (type === "fill" ? "#ffffff" : "#ED8936")};
  padding: 10px 0;
  background: ${({ type }) => (type === "fill" ? "#ED8936" : "#ffffff")};
  border: 2px solid #ed8936;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  &:hover {
    opacity: 0.8;
  }
`;

export default Header;
