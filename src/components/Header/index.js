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
    <Wrapper>
      <Container>
        <Logo to="/">SnapSpots</Logo>
        <Links>
          <Link to="/home">home</Link>
          <Link to="/spot/create">create</Link>
          {user ? (
            <Button onClick={handleSignOut}>sign out</Button>
          ) : (
            <Link to="/sign-in">
              <Button>sign in</Button>
            </Link>
          )}
        </Links>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 40px;
  background: #2c5282;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
`;

const Logo = styled(L)`
  text-decoration: none;
  font-size: 22px;
  font-weight: 700;
  color: white;
`;

const Links = styled.div``;

const Link = styled(L)`
  margin-left: 10px;
  text-decoration: none;
  color: white;
`;

const Button = styled.button``;

export default Header;
