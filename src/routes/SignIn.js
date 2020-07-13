import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { userSignIn } from "../reducers/user";

const SignIn = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => dispatch(userSignIn({ username, password }));

  const error = useSelector((state) => state.user.error);

  return (
    <Container>
      {error && <Error>{error}</Error>}
      <Input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSubmit}>Sign In</Button>
      <Link to="/sign-up">Sign Up</Link>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Error = styled.h1`
  color: red;
`;

const Input = styled.input``;

const Button = styled.button``;

export default SignIn;
